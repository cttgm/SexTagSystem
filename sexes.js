	var table = ["tag","implication","level"];
	table.tag=[];
	table.implication=[];
	table.level=[];
	var index=0,depth=0;
	var input=["pe","te","ma","va","cli"];
	var yn=["","no"];
	window.onload = init;
	
	function arrTupel(prefix,tab){
		var out=[];
		var lind=0;
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
				
			if (restTable.length>0){
				var tupel=arrTupel(prefix+yn[0]+tab[i],restTable,i);
				for (var k=0;k<tupel.length;k++){
					table["tag"][++index]=prefix+yn[0]+tab[i];
					table["implication"][index]=tupel[k];
					table["level"][index]=depth;
					out[lind++]=tupel[k];
				}
				tupel=arrTupel(prefix+yn[1]+tab[i],restTable,i);
				for (var k=0;k<tupel.length;k++){
					table["tag"][++index]=prefix+yn[1]+tab[i];
					table["implication"][index]=tupel[k];
					table["level"][index]=depth;
					out[lind++]=tupel[k];
				}
			}
			else {
				out[lind++]=prefix+yn[0]+tab[i];
				out[lind++]=prefix+yn[1]+tab[i];
			};
		}
		depth--;
		return out;
	}
	
	function printTable(){
	var output="<table><tr><td>Level</td><td>Tag</td><td>implication</td></tr>";
	output+="";
	output+="<tableheader><em>"+table["tag"].length+"</em> Implications have been generated.</tableheader>";
	for (var i=1; i<Math.min(table["tag"].length,500);i++){
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
		arrTupel("",input);
    	document.getElementById("implicationTable").innerHTML = printTable();
    }