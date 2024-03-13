---
sidebar_label: "(Statistical) ARIMA"
sidebar_position: 2
---

# Autoregressive Integrated Moving Average: ARIMA

## How It Works

The auto-regressive integrated moving average (ARIMA) is a classical model used for statistical time-series analysis which makes predictions by averaging a select number of previous
observations, after accounting for stationarity, and cannot utilize multiple explanatory variables. This makes it well-suited for cases where time-series forecasts must be made without
clean, structured explanatory variables, making it, currently, one of the most widely used
forecasting model architectures in the industry.

## Why We Think It's Good

For that reason, we implemented a basic
ARIMA model for the “Statistical Modeling” category to serve as a stand-in for the current
state of the industry. However, it is to be mentioned that the lack of seasonality in our data
may negatively affect its forecasting accuracy
