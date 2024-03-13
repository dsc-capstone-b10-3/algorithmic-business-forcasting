---
sidebar_label: 'Results'
sidebar_position: 4
---

# Results

## How We Evaluated Our Models

To simplify training and maintain consistency with previous works, we trained and evaluated our model performances using root mean squared error (RMSE).


For forecasting evaluation, we considered two different use case scenarios: immediate nextyear forecasting and long-term forecasting. To evaluate our models’ immediate next-year
forecasting capabilities, we trained them on data from 2012 to 2020 and evaluated them
against observed data for 2021. For long-term forecasting, we would preferably evaluate
forecasting performance tens of years after our training data, as SANDAG does with their
Series 14 Forecasts(SANDAG 2018), forecasting out to 2050 using a base year of 2016.
However, with a limited range of years available to us, we chose to train our models on
data from 2012 to 2018 and evaluate them against observed data from 2019 to 2021.

## Our Final Results

INSERT EVALUATIONS

INSERT TEST LINEPLOTS

We see that our ordinary least squares models, including LASSO, perform the best in terms
of RMSE, and predict closest to actual establishment growth, likely because their assumptions of monotonic growth are reflected in both our training and testing data.

Like our ordinary least squares models, our ARIMA model appears to underestimate establishment growth year after year. However, due to it making predictions by averaging the
last few timestamps, each under-prediction further reduces the next prediction, resulting in
significant under-prediction compared to our other models. In actuality, though, this result
of conservatively underestimating establishment growth may be preferred to an alternative
of compounding overprediction when it comes to the forecast’s influence on planning decisions.

While our ”Algorithmic Models”, random forest and LSTM, perform poorly in terms of
RMSE, they exhibit more ”dynamic” predictions than our “Statistical Models”, in that, their
forecasts change more drastically than our “Statistical Models”, which are mostly predicting the same number of new establishments every subsequent year. This indicates some
potential for the “Algorithmic Models” to outperform “Statistical Models” in cases where
recession years are accounted for. Another potential reason for their higher RMSEs could
simply be due to the number of records we used for training, as without enough diverse
training data, our “Algorithmic Models” resort to overfitting on the train set.

Our results conclude that “Statistical Models” outperform “Algorithmic Models” in forecasting establishment counts by ZIP Code, with LASSO regression coming onto with an immediate next year and long-term testing RMSE of 22.83 and 20.04 respectively. However,
we believe that the data we resorted to using, due to various data limitations, significantly
influenced this outcome, as a lack of recession years coincidentally fit the assumptions of
our ordinary least squares models, where the real-world phenomena may not. 
