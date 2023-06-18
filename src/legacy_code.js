// useEffect(() => {
//     // Fetch Data
//     const source = axios.CancelToken.source();
//     const url = `${baseUrl}/channels/2188426/feeds.json?api_key=70GX3Q7IIG5U6GX2&results=2`;
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(url);
//         if (response.status === 200) {
//           setHumidity1(response.data.feeds[0].field1);
//           setHumidity2(response.data.feeds[0].field2);
//           setHumidity3(response.data.feeds[0].field3);
//           setHumidity4(response.data.feeds[0].field4);
//           setWaterLevel(response.data.feeds[0].field5);
//           setIsLoading(false);
//           console.log("Data Fetched")
//           return;
//         } else {
//           throw new Error("Failed to fetch users");
//         }
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           console.log('Data fetching cancelled');
//         } else {
//           setErrorFlag(true);
//           setIsLoading(false);
//         }
//       }
//     };
//     fetchData();

//     return () => source.cancel("Data fetching cancelled");
//   }, [])