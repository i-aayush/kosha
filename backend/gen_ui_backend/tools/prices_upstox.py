import os
from typing import Dict, Union

import requests
from langchain.pydantic_v1 import BaseModel, Field
from langchain_core.tools import tool
import upstox_client 
from upstox_client.rest import ApiException

class GetUpPricesInput(BaseModel):
    ticker: str = Field(..., description="The ticker of the stock.")
    from_date: str = Field(..., description="The start of the price time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.")
    to_date: str = Field(..., description="The end of the aggregate time window. Either a date with the format YYYY-MM-DD or a millisecond timestamp.")
    interval: str = Field(..., description="The interval of the candle data, 1minute, day, week, month, year")


@tool("get-up-prices", args_schema=GetUpPricesInput, return_direct=True)
def get_up_prices(ticker: str,interval:str , from_date: str, to_date: str) -> Union[Dict, str]:
    """
    Get aggregate bars (stock prices) for a stock over a
    given date range for a given ticker (BSE_EQ|INE002A01018) from upstox 
    """
    api_instance = upstox_client.HistoryApi()
    api_version = 'api_version_example' # str | API Version Header

    try:
        # Historical candle data
        api_response = api_instance.get_historical_candle_data1(ticker, interval ,from_date,to_date, api_version)
        print(api_response)
    except ApiException as e:
        print("Exception when calling HistoryApi->get_historical_candle_data: %s\n" % e)

    return api_response.data.candles
