---
sidebar_label: "(Algorithmic) LSTM Neural Net"
sidebar_position: 4
---

# Long Short Term Memory Neural Network: LSTM

## How It Works

Neural networks are the second key representative of “Algorithmic Modeling” mentioned
by Breiman in “Statistical Modeling: The Two Cultures(Breiman 2003)”, of which recurrent neural networks are specifically designed for time series analysis. The long short-term
memory network(Hochreiter and Schmidhuber 1997), is an adjustment of the basic recurrent neural network, specifically on how hidden states and calculated and used, which
allows the model to retain “memory” of previous time steps over extended time intervals.

## Why We Think It's Good

This capability of retaining information on data from hundreds or thousands of timestamps
in the past makes LSTMs a good candidate for forecasting recession years, which are often
significantly spaced apart and independent of seasonality. As a variant of recurrent neural
networks, it is also capable of taking in an arbitrary number of inputs at each time step,
allowing it to take advantage of the variance present in explanatory features, combining the
benefits of both OLS and ARIMA models, making it the optimal candidate for our problem.
