import _ from 'lodash';

import fs from 'fs';

//export default ({ config, params }) => {
  
  try {
    
    const queries = fs.readdirSync('./queries/');
    
    const json = []
    
    for(const name of queries){
      const names = name.split('.');
      if(names[1] == 'graphql') {
        const queryName = names[0];
        const query = fs.readFileSync(`./queries/${name}`);
        json.push({
          queryName,
          query: query.toString()
        })
      }
    }
    
    fs.writeFileSync('./queries/queries.json', JSON.stringify(json))
    
    
    
  } catch (e) {
    console.trace(e)
  }
  
//}

