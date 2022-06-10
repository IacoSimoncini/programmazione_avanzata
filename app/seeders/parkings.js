'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Parkings', [
            {
                id:'ceb522ac-48c8-4c54-b01a-8695bb09a728',
                lat:43.616540, 
                long:13.516557
                
              },
              {
                id:'2731b39a-43a7-4dad-9d59-b6ac8ec27a4b',
                lat:43.617319, 
                long:13.507722
                
              },
              {
                id:'ed493e83-14e4-481b-b082-02b37a33418f',
                lat:43.614181, 
                long:13.505222
                
              },
              {
                id:'5f12a8a3-425e-4eac-80a5-cc6bd98abb8d',
                lat:43.616579, 
                long:13.532944
                
              },
              {
                id:'066a8ea5-677f-4282-ac12-e22ba99ac28e',
                lat:43.614575, 
                long:13.532930
                
              },
              {
                id:'d875d34e-7e50-45c8-ba2a-b92b07899cbf',
                lat:43.613226, 
                long:13.516160
                
              },
              {
                id:'a7f10274-90d9-4f6c-bb74-bdf15196a356',
                lat:43.610398, 
                long:13.515323
                
              },
            
    ]);
},
down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('Users', null, {});
}
};