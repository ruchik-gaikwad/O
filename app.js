var fs = require('fs');
var readline = require('readline');


  var allFiles = ['resources/India2011.csv', 'resources/IndiaSC2011.csv' , 'resources/IndiaST2011.csv']

  var  stream = '';

  var readAllfiles = allFiles.forEach(function(element){
        stream = fs.createReadStream(element);
  })

  var rl =  readline.createInterface({
    input: stream,

  })

  var headCheck = true;
  var fileHeader = [];
  var fileData = [];
  var ageWiseData = [];
  var resultArray = []



  rl.on('line', function(data){
    var resultJson = {}

    if (headCheck) {
       fileHeader = data.split(',');
       headCheck = false;

    } else {
       fileData = data.split(',');
       for (var i = 0; i < fileHeader.length; i++){
          resultJson[fileHeader[i]] = fileData[i];

       }
    }
    resultArray.push(resultJson)

  });

  rl.on('close', function (){

      ageWiseDistribution(resultArray);
      function ageWiseDistribution(resultArray) {
        var ageWiseArray = []
        ageWise ={}
        var filter = resultArray.forEach(function(element){
            if (element['Age-group'] !== 'Age not stated' && element['Age-group']!== 'All ages' && element['Age-group'] !== undefined){
                ageWise = {
                  "Age-group" : element['Age-group'],
                  "Population" : parseInt(element['Literate - Persons'])
                }
                ageWiseArray.push(ageWise)
            }
      })

      var summationArray = ageWiseArray.slice(0, 27)

        ageWiseArray.forEach(function(element){
          summationArray.map(function(value){
            if(value['Age-group'] === element['Age-group']){
                value['Population'] += element['Population']
              }
          })
        })
        console.log(summationArray)// AGE-GROUP WISE DATA SEGRIGATED

      }
      graduationWise(resultArray)
      function graduationWise (resultArray) {
        var graduateArray = []
        var gradObj = {}
        var filter = resultArray.forEach(function(element){
          if(element['Educational level - Graduate & above - Males'] !== '0' && element['Educational level - Graduate & above - Males'] !== undefined &&
              element['Age-group'] !== 'All ages' && element['Total/ Rural/ Urban'] == 'Total' && element['Age-group'] !== 'Age not stated'){

            gradObj = {
              "State" :  element['Area Name'],
              "Garduate-Males" : parseInt(element['Educational level - Graduate & above - Males']),
              "Graduate-Female" : parseInt(element['Educational level - Graduate & above - Females'])
            }
            graduateArray.push(gradObj)

          }
        })

        var summationArray =[]
        var count = 0;
        for (var i = 0; i < 34; i++){
          summationArray.push(graduateArray[count])
          count = count + 14
        }

          graduateArray.forEach(function(element){
            summationArray.map(function(value){

              if(value['State'] === element['State']){
                  value['Garduate-Males'] += element['Garduate-Males']
                  value['Graduate-Female'] += element['Graduate-Female']
                }
            })
          })
          console.log(summationArray)  // STATEWISE GRADUATED PERSONS SEGRIGATED
      }
      eduWise (resultArray)
      function eduWise (resultArray){
        var eduArray = [];
        var eduObj = {};
        var filter = resultArray.forEach(function(element){
          if(element['Age-group'] !== 'All ages' && element['Total/ Rural/ Urban'] == 'Total' && element['Age-group'] !== 'Age not stated'){
              eduObj = {
                          Without_EduLvl : parseInt(element['Educational level - Literate without educational level - Persons']),
                          Below_Primary : parseInt(element['Educational level - Below Primary - Persons']),
                          Primary : parseInt (element['Educational level - Primary - Persons']),
                          Middle : parseInt(element['Educational level - Middle - Persons']),
                          Matric : parseInt(element['Educational level - Matric/Secondary - Persons']),
                          Senior_Secondary : parseInt(element['Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons']),
                          NonTtechnical_Diploma : parseInt(element['Educational level - Non-technical diploma or certificate not equal to degree - Persons']),
                          Technical_Diploma : parseInt(element['Educational level - Technical diploma or certificate not equal to degree - Persons']),
                          Graduate : parseInt(element['Educational level - Graduate & above - Persons']),
                          Unclassified : parseInt(element['Educational level - Unclassified - Persons'])
                        }
                        eduArray.push(eduObj);
          }

        })

        var summationArray = eduArray.slice(0,1);
        eduArray.forEach(function(element){
          summationArray.map(function(value){

            if(JSON.stringify(Object.keys(value)) == JSON.stringify(Object.keys(element))){
                   value['Without_EduLvl'] += element['Without_EduLvl']
                   value['Below_Primary'] += element['Below_Primary']
                   value['Primary'] += element['Primary']
                   value['Middle'] += element['Middle']
                   value['Matric'] += element['Matric']
                   value['Senior_Secondary'] += element['Senior_Secondary']
                   value['NonTtechnical_Diploma'] += element['NonTtechnical_Diploma']
                   value['Technical_Diploma'] += element['Technical_Diploma']
                   value['Graduate'] += element['Graduate']
                   value['Unclassified'] += element['Unclassified']
                }
          })
        })
        console.log(summationArray); // EDUCATION WISE DATA  SEGRIGATED
      }
  })
