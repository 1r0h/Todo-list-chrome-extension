document.getElementById("inputBox").addEventListener("keypress",submitFunction)

window.onload=function()
	{
		chrome.storage.sync.get(function(result){
			var html="";
			if(result['valu']!=undefined)
			{
				for(i=0;i<result['valu'].length;i++)
				{
					html+=result['valu'][i]+"<br/>";
				}
				document.getElementById("list").innerHTML=html;
			}
		});
	}

chrome.runtime.onInstalled.addListener(function (){
	
	chrome.storage.sync.set({"valu":["arindam"]},function(){
		console.log("first time settings saved!");
	});
});
//document.getElementById("inputBox").onkeypress=submitFunction(event);

function submitFunction(event)
{
	var key=event.keyCode || event.which;
	if(key==13)
	{
	var valu=document.getElementById("inputBox").value;
	console.log(valu);
	document.getElementById("inputBox").value="";
	chrome.storage.sync.get(function(result){
		console.log("storing new value");
		if(result['valu']==undefined)
		{
			chrome.storage.sync.set({"valu":[valu]},function(){
				console.log("first value saved");
				document.getElementById("list").innerHTML=valu+"<br/>"
			});
		}
		else
		{
			newList=result['valu']
			newList.push(valu);	
			console.log(newList);
			chrome.storage.sync.set({"valu":newList},function(){
				console.log("a new value added");
				var ht=document.getElementById("list").innerHTML;
				ht+=valu+"<br/>";
				document.getElementById("list").innerHTML=ht;
			});
			
		}
	});
	//chrome.storage.sync.get("value",storenValu(valu));
	}
}
