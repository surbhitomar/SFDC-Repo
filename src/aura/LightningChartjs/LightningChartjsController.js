({	


    ctr2 : function(component,event,helper){
                
        var sobje = component.get("v.sObj");        
        var chartTypeJ= component.get("v.chartTypeV");
        console.log(sobje+'--sobje----chartTypeJ--->>>'+chartTypeJ);
 
        var X_AxisFieldJ = component.get("v.X_AxisFieldV");
        console.log('-JS-X_AxisField-->>>'+X_AxisFieldJ);     
        var Y_AxisFieldJ = component.get("v.Y_AxisFieldV");
        var SummarizeTypeJ = component.get("v.SummarizeTypeV");
        console.log(SummarizeTypeJ+'---JS-Y_AxisField-->>>'+Y_AxisFieldJ);
       
        var action = component.get("c.mapOfValues");
        action.setParams({
        	selectedObject : sobje,
            X_AxisField : X_AxisFieldJ,
            Y_AxisField : Y_AxisFieldJ,
            SummarizeType : SummarizeTypeJ
    	});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.mapOfChartValues",response.getReturnValue());
                console.log('response in LJS-->'+response.getReturnValue());
        var lableArr1= [];
        var valArr1= []; 
        var bgcolor1= [];
          
        var el = component.find('barChart').getElement();
        var ctx = el.getContext('2d');
        var chartTypeJ= component.get("v.chartTypeV");
        var SummarizeTypeJ= component.get("v.SummarizeTypeV");
        var X_AxisFieldJ= component.get("v.X_AxisFieldV");
        var Y_AxisFieldJ= component.get("v.Y_AxisFieldV");
        var temp = response.getReturnValue();
                
        console.log('chartTypeJ--->>>'+chartTypeJ+'-temp--'+temp) 
       
        for (var singlekey in temp) {
            console.log('--singlekey--'+singlekey+'--val--'+temp[singlekey]);
            lableArr1.push(singlekey);
            valArr1.push(temp[singlekey]);
          
        }
                
         
        console.log('--lableArr1--'+lableArr1+'--valArr1--'+valArr1);
          //data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}] 
        new Chart(ctx, {
           type: chartTypeJ,
           data: {
                labels: lableArr1,
                datasets: [
                    {
                        label: SummarizeTypeJ+' of '+ Y_AxisFieldJ,
                        backgroundColor: [
                            'rgba(23, 48, 91, 1)',
                            'rgba(62, 159, 222, 1)',
                            'rgba(48, 165, 154, 1)',
                            'rgba(132, 220, 214, 1)',
                            'rgba(222, 159, 0, 1)',
                            'rgba(223, 205, 114, 1)',
                            'rgba(172, 104, 176, 1)',
                            'rgba(218, 5, 25, 1)',
                            'rgba(239, 247, 9, 1)'
                        ],
                        data: valArr1
                    }
                ]
            },
            options: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
             responsive: true
        });   
                
            }
        });
        $A.enqueueAction(action);
    },
    
    getRandomColor: function()
    {
        var o = Math.round, r = Math.random, s = 255;
        var color = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
        console.log('#### color: ' + color);
    	return color;
    }, 
     
    
    	//Not using right now ctr function
    ctr : function(cmp, event, helper) {
        var temp = [];
        var temp2 = [];
        var action1 = cmp.get("c.getLineChartMap");
        var action = cmp.get("c.getChartMap");
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS' && response.getReturnValue()){
                temp = response.getReturnValue();
                helper.createGraph(cmp, temp);
            }
        });      
        action1.setCallback(this, function(response){        	    	    
            if(response.getState() === 'SUCCESS' && response.getReturnValue()){
                temp2 = JSON.parse(response.getReturnValue());
                helper.createLineGraph(cmp, temp2);
            }            
        });  
       $A.enqueueAction(action);	
       $A.enqueueAction(action1);
	},
})