import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { useEffect } from 'react';

// Note: Change v1 to v2 on rapid api

const cryptoExchangeApiHeaders = {

  'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com',
  'X-RapidAPI-Key': process.env.KEY
};


const createRequest = (url) => ({ url, headers: cryptoExchangeApiHeaders });

export const cryptoExchangeApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://exchangerate-api.p.rapidapi.com' }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),


    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoExchangeApi;

const APITest = () => {
  const options = {
    method: 'GET',
    url: 'https://exchangerate-api.p.rapidapi.com/rapid/latest/USD',
    headers: {
      'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.KEY
    }
  };
  useEffect(() => {
    const getData = async () => {
      const result = await axios.request(options).then(function (response) {
        // console.log(response.data.rates);
        return response.data.rates
      }).catch(function (error) {
        console.error(error);
      });
      console.log(result);
    }
    getData()
  }, [])

  return (
    <>
    </>
  )
}
export default APITest