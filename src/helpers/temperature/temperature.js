const fetchTemperature = async () => {
   const requestBody = {
      query: `
            query {
               temperature {
                  temperature
               }
               }
         `
   };

   await fetch("http://192.168.1.214:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then(res => {
         if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed!");
         }
         return res.json();
      })
      .then(resData => {
         const temperature = resData.data.temperature.temperature;
         console.log(temperature);
         return temperature;
      })
};

export default fetchTemperature;