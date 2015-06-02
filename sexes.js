	var table = ["tag","implication","level"];
	table.tag=[];
	table.implication=[];
	table.level=[];
	var index=0,depth=0;
	var input=["pe","te","ma","va","cli"];
	var yn=["","no"];
	window.onload = init;
	
	function arrTupelMin(prefix,tab){
		depth++;
		for (var i=0; i<tab.length ;i++){
			// für jedes Element
			var restTable=[];
			for (var j=0; j<i;j++){
					restTable[j]=tab[j];
				}
			for (var j=i+1; j<tab.length;j++){
					restTable[j-1]=tab[j];
				}
			if (restTable.length>0 ){
				arrTupelMin(yn[0]+tab[i],restTable);
				arrTupelMin(yn[1]+tab[i],restTable);
				if (depth<=1||true){ /* for debugging */
					for (var j=0; j<restTable.length;j++){
						table["tag"][index]=prefix+yn[0]+tab[i];
						table["implication"][index]=prefix+yn[0]+tab[i]+yn[0]+restTable[j];
						table["level"][index++]=depth;
						
						table["tag"][index]=prefix+yn[0]+tab[i];
						table["implication"][index]=prefix+yn[0]+tab[i]+yn[1]+restTable[j];
						table["level"][index++]=depth;
				
					}	
				}
			}
		}
		depth--;
	}
	
	function printTable(){
	var output="<table><tr><td>Level</td><td>Tag</td><td>implication</td></tr>";
	output+="";
	output+="<tableheader><em>"+table["tag"].length+"</em> Implications have been generated.</tableheader>";
	for (var i=0; i<Math.min(table["tag"].length,500);i++){
		output+="<tr>";
		output+="<td>";
		output+=table["level"][i];
		output+="</td>";
		output+="<td>";
		output+=table["tag"][i];
		output+="</td>";
		output+="<td>";
		output+=table["implication"][i];
		output+="</td>";
		output+="</tr>";
	}	
	output+="</table>";
	return output;
	}

	function init() {
		arrTupelMin("",input);
    	document.getElementById("implicationTable").innerHTML = printTable();
    }