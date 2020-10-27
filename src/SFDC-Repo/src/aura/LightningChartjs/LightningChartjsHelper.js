({
    displaydata : function(component, event, helper) {
            var sobje = component.get("v.sObj");
            var X_AxisFieldJ = component.get("v.X_AxisFieldV");
            var Y_AxisFieldJ = component.get("v.Y_AxisFieldV");
            console.log('Helper--sobje-->>>'+sobje);
        	console.log('Helper--field-->>>'+X_AxisFieldJ);
            //var map = new Map();
            //map= component.get("v.mapOfChartValues");
            //map.set(listofpicklistvalues[j],openopps);
            //console.log('Helper--map--->>'+map);
            this.createGraph(component,component.get("v.mapOfChartValues"));
            /*var listofpicklistvalues = component.get("v.picklistvalues");
            console.log('Helper--listofpicklistvalues-->>>'+listofpicklistvalues);
            var action = component.get("c.generateDataa");
            action.setParams({
                selectedObject : sobje,
                X_AxisField : X_AxisFieldJ,
                Y_AxisField : ''
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                var outputresponse = response.getReturnValue();
                console.log('Helper outputresponse--->>'+outputresponse);
                console.log('Helper outputresponse[0].lstofobj.closedate--->>'+outputresponse[0].lstofobj.closedate);
                console.log('Helper state--->>'+state);
                if (state === "SUCCESS") {
                    for(var j=0; j< listofpicklistvalues.length; j++){
                        var openopps=0;
                        for(var i=0; i < outputresponse.length; i++){
                            //console.log('res::'+outputresponse[i].selectedfield);
                            if(listofpicklistvalues[j] === outputresponse[i].selectedfield){
                                //console.log('inside if');
                                openopps = openopps+1;
                            }
                        }
                        map.set(listofpicklistvalues[j],openopps);
                        
                    }
                    console.log('Helper--map--->>'+map);
                    this.createGraph(component,map);
                } else {
    
                }
            });
            $A.enqueueAction(action);*/
         },
	  createGraph : function(cmp, temp) {
          
        console.log(temp+'createGraph--map Size->>'+temp.size);

        var lableArr1= [];
        var valArr1= []; 
        var bgcolor1= [];
          
        var el = cmp.find('barChart').getElement();
        var ctx = el.getContext('2d');
        var chartTypeJ= cmp.get("v.chartTypeV");
        console.log('chartTypeJ--->>>'+chartTypeJ); 
          
        for (const key of temp.keys()) {
            console.log('--key--'+key+'--value--'+temp.get(key));
                
            lableArr1.push(key);           
            valArr1.push(temp.get(key));
            var bg=  'rgba(255, 99, 132, 0.2)';
            if(key == 'Closed Won'){  bg= 'rgba(97, 171, 64)';}            
            else if(key == 'Closed Lost'){ bg= 'rgba(193, 37, 83)';  }
            else if(key == 'Needs Analysis'){ bg= 'rgba(255, 99, 132, 0.2)';  }
            else{ bg= 'rgba(255,255,0,1)'; }
            bgcolor1.push(bg);
            
        }
          
        console.log('--lableArr1--'+lableArr1+'--valArr1--'+valArr1);
           
        new Chart(ctx, {
           type: chartTypeJ,
           data: {
                labels: lableArr1,
                datasets: [
                    {
                        label: "Payments History",
                        backgroundColor: bgcolor1,
                        data: valArr1
                    }
                ]
            }
        });   
          
	},
    
    
  //Not Using this method 
    createLineGraph : function(cmp, temp) {
        
        var label = [];
        var firstValue = [];
        var secondValue = [];
        
        for(var a=0; a< temp.length; a++){
            console.debug(temp[a]["label"]);
            label.push(temp[a]["label"]);
            firstValue.push(temp[a]["firstValue"]);
            secondValue.push(temp[a]["secondValue"]);                     
        }    
        var el = cmp.find('lineChart').getElement();
        var ctx = el.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                    labels: label,
                    datasets: [{
                      label: 'USD Sent',
                      data: firstValue,
                      backgroundColor: "rgba(153,255,51,0.4)"
                    }, {
                      label: 'USD Recieved',
                      data: secondValue,
                      backgroundColor: "rgba(255,153,0,0.4)"
                    }]
                  }
        });
        
	}
    
})