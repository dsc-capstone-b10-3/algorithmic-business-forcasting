---
title: "Forecasting Regional Aggregate Establishment Birth-Death Values: Using Algorithmic Modeling"
header:
  overlay_image: /assets/images/grey_blue.png
  # caption: "Photo Credit: Unsplash"
  actions:
    - label: "Project GitHub Repo"
      url: "https://github.com/inno-apfel/DSC180A-Q1-Project"
# gallery:
#     - url: /assets/images/FinDL_Stack2.png
#       image_path: assets/images/FinDL_Stack2.png
#       alt: "FinDL Module Stack"
#       title: "FinDL Module Stack"
# gallery2:
#     - url: /assets/images/FinDL_Workflow2.png
#       image_path: assets/images/FinDL_Workflow2.png
#       alt: "FinDL Workflow"
#       title: "FinDL Workflow"
# gallery3:
#     - url: /assets/images/loss_trenet.png
#       image_path: /assets/images/loss_trenet.png
#       alt: "Trenet losses"
#       title: "TreNet Training and Validation Loss"
#     - url: /assets/images/loss_lstm.png
#       image_path: /assets/images/loss_lstm.png
#       alt: "LSTM losses"
#       title: "LSTM Training and Validation Loss"
#     - url: /assets/images/loss_cnn.png
#       image_path: /assets/images/loss_cnn.png
#       alt: "CNN losses"
#       title: "CNN Training and Validation Loss"
layout: single
classes: wide
author_profile: true
---

## Introduction

This is a project created in partnership with The San Diego Association of Governments (SANDAG) under UC San Diego's Halıcıoğlu Data Science Institute undergraduate mentorship program.

Establishment birth and death data are highly significant for understanding the job market and business cycles. Birth data provide a measure of entrepreneurial activities and gauge new entries and reallocation of resources towards growing areas. Similarly, business death data measure failing enterprises and identify sectors from which resources are being shifted away.

Actual values are calculated by government agencies like the U.S. Census Bureau and Bureau of Labor Statistics using national surveys and IRS tax form information. However, are only available with substantial lag, giving value to accurate forecasting.

INSERT STATEMENT ABOUT ENTREPRENEURSHIP AND WHY SANDAG CARES
 
Accurate forecasts of establishment birth and death values are valuable for local government planning organizations. They can providing significant insight into the state of national/regional entrepreneurship, informing local planning and policymaking. 

INSERT STATEMENT ABOUT SIGNIFICANCE OF FORECASTING AT THE ZIPCODE LEVEL OR LOWER
TO INCREASE SIGNFICANCE OF OUR WORK FOR SANDAG

Existing forecasting methodology employs "Statistical Modeling" techniques, such as an Autoregressive Integrated Moving Average (ARIMA), and are mainly characterized by consistent seasonal patterns. However, such forecasts have broken down during times of extreme change, such as the recent COVID-19 recession. This opens the doors to a different framework based on "Algorithmic Modeling", which has only been sparsely explored in this problem space. 

Recent work, by Grieves et. al., hint at the potential of "Algorithmic Models", specifically Recurrent Neural Networks, to outperform traditional "Statistical Models" in predicting business birth and deaths. 

Given this gap in research, we trained and evaluated various "Statistical" and "Algorithmic" modeling architectures on U.S. Census Bureau data, to assess the potential of "Algorithmic Modeling" in producing accurate birth-death forecasts.

## Data

In a perfect world, to make forecasts of establishment birth-death values on a regional level, we have records of establishment birth-death values by month for an expansive range of years, that is further broken down by some sort of geographical area, such as census blocks. However, for security purposes, data at such a granularity is generally restricted for use by government organizations, and not available to the general public. 

For this project, since we were not allotted clearances for that sort of data, we chose to only use publically available data. This was a significant challenge, as publically available establishment birth-death data by geographic area was limited. 

In the end, comprising between our prefered data format and what was available, we sourced data on count of establishments broken down by year and ZIP Code Tabluation Area(ZTCA). While birth-death data is available by month through the U.S. Bureau of Labor Statistic's Current Employment Statistics program and by county or state from the U.S. Census' Business Dynamics Statistics program, we sought to look for smaller geographic areas, to stay within the San Diego County. To this end, ZTCAs were the smallest level of geographical area we could get our hands on. However, since birth-death data were not available by ZTCA we compromised by using establishment count, which is roughly equal to the previous years's establishment count plus total births and total deaths.

This data on establishment counts by ZTCA can be found in U.S. Census Bureau's ZIP Code Business Patterns Totals datasets, collected as part of the County Business Patterns (CBP) program. As ZBP data was only available up to 2021 at the time of our project, we used data from 2012 to 2021. While ZBP records back until 1984 exist, a lack of auxiliary data, as explained below, restricts our use to 2012 and after.

As currently deployed birth-death forecasts, built upon the ARIMA model, can only learn from trends and patterns within birth-death values, we sought to source auxiliary data to act as independent/explanatory variables for our "Algorithmic Models", believing that more nuanced patterns could be learned from them.

In determining potential explanatory variables, we referenced prior analyses on regional variation in business births and deaths by Reynolds et al. Based on their work we collected data representing the processes, they found to have "major" or "strong" impact:
- Career Opportunity: # midcareer
- Volatile Industries: industry pct
- Greater Personal Wealth: median household income
- Population Growth: # population

INSERT REFERENCES TO SCAG PPT MICHAEL FOUND / SANDAG S14 DEV REPORT

<details>
<summary>learn more</summary>

- [Explaining Regional Variation in Business Births and Deaths](https://www.jstor.org/stable/40228793)
- [SCAG PPT]()
</details>
<br>

For data to be used as explanatory variables, we collected the following ZCTA indexed socio-demographic and economic datasets from the U.S. Census:
- ZIP Code Business Patterns Details
  - industry details data
- American Community Survey DP05
  - population demographics data
- American Community Survey S0101
  - population by age categories
- ZIP Code Business Patterns  
  - employment counts data
- American Community Survey DP02
  - household counts data
- American Community Survey S1901
  - median household income data


## Data Processing

Our collected data was in the form of multiple datasets, with an individual csv file for each year and dataset pair. To simplify model development and training, we would prefer a single master csv file dataset to work off. To achieve this, we cleaned and processed all the individual datasets, concatenating and merging them when necessary to create a single dataset indexed by (ZTCA, year) pairs containing all our collected variables. 

We then applied various transformations on the socio-demographic and economic data to produce features that would accurately reflect the explanatory processed previously mentioned.

For every Naics industry code in our data, we created a feature called naics_x_pct, and for every establishment size bin in our data, we created a feature called ni_j_pct.

![naicsnijformulas](/assets/images/naicsnijformulas.png)  

Additionally, we created a total_retirement population estimate feature by summing the estimates for populations greater or equal to age 65. We also chose to observe the mid-career working populations and split those features into the age groups 25-34 and 35-44 to observe any differences between them. 

![retirementmidcareerformulas](/assets/images/retirementmidcareerformulas.png)  

To simplify the model training process, we standardized the data, filtered for only ZCTAs within San Diego county, and dropped any ZCTAs that were missing observations for any year.

Applying the above processes brings us to our final master dataset, used as input for all our models:

![masterdataset](/assets/images/master_dataset.png)  

## Exploratory Data Analysis

Once we prepared and loaded our data, we first did some exploratory data analysis to better understand the data. We focused on looking into how our data was distributed geographically and temporally, along with the ranges of values we were dealing with for our features.

First, lets take a look at how establishments are distributed across ZIP Codes in San Diego:

![esttruesplot](/assets/images/est_trues_2021.png)

Looking at Figure 1, we see that most ZIP Codes have around 15k or less establishments, with a few outlier ZIP Codes with significantly more establishments such as Downtown San Diego (92101) with ~41k establishments.

With that, we may be interesting in seeing how our values change over time:

![linlinplot](/assets/images/lin_lin_plot.png)

Looking at Figure 2, we see that establishment counts and annual payroll increase consistently in a linear fashion.

![linexpplot](/assets/images/lin_exp_plot.png)  

Looking at Figure 3, we see that median household income seems to increase exponentially for some reason.

![lindipplot](/assets/images/lin_dip_plot.png)  

Looking at Figure 4, we see that employee counts and total population increase linearly, however see a significant dip with the beginning of the COVID-19 pandemic.

Now we can take a look at the ranges for values we are dealing with, to see how they differ generally across ZIP Codes:

![genviolinplot](/assets/images/general_violin.png)  

Looking at Figure 5, we see that total population and median household income seem mostly normally distributed, while employee counts see a few large outliers, reflecting ZIP Codes where jobs are aggregated.

![estsizeplot](/assets/images/est_size_violin.png)  

Looking at Figure 6, we see that smaller businesses (n1_4_pct) are mostly normally distributed across ZIP Codes, while big busineses (n500_999_pct + n1000_pct) see a couple large outliers. This indicates that some specific ZIP Codes either develop or attract most large businesses in the region.

![naicsplot](/assets/images/naics_violin.png)  

Looking at Figure 7, we see similar patterns of right-skewed distributions, indicating preferences for businesses to establish themselves in ZIP Codes with other businesses in the same industry. We see that the health sector (naics_62) seems to be particularly affected by this "grouping behavior" while the tech sector (naics_54) cares less. A reasonably explaination could be that the tech sector, mostly comprised of desk work on computers, may be less dependent on physical contact between different establishments, than say the health sector, which may value geographical closeness for transfer of samples/patients.


## Modeling Architecture

As our primary experimental objective was to assess the potential of "Algorithmic Modeling", we split our modeling architectures into two categories: "Statistical" and "Algorithmic". For each category, we evaluated one simpler "baseline" model and a "theoretically best" model. Specifically, we implemented a multiple linear regression model and ARIMA model for the "Statistical" category and a random forest regressor and a Long Short Term Memory Recurrent Neural Network for the "Algorithmic" category. 

To avoid the curse of dimensionality and "trash in trash out", we trained the model on a select set of features chosen by their coorelation to establishment count and mean decrease impurity (gini importance).

![corrplot](/assets/images/corr_plot.png)  

![mdiplot](/assets/images/mdi_plot.png)  

<details>
<summary>learn more</summary>

- [Coorelation](https://en.wikipedia.org/wiki/Correlation)
- [Mean Decrease Impurity](https://medium.com/@aneesha161994/gini-impurity-vs-gini-importance-vs-mean-decrease-impurity-51408bdd0cf1)
</details>
<br>

A key note is that, since the multiple linear regression and random forest regression models require data on independent variables at inference, they were trained on a modified dataset where all indepedent variables were lagged by 1 year. 

### Multiple Linear Regression / Ordinary Least Squares

![linreg](/assets/images/lin_reg.png)  

Linear models, including ordinary least squares, are simple statistical models commonly used in the econometrics domain for their interpretability (Reynolds, Miller and Maki 1995). Multi-variate linear regression models, are one of the simplest modeling techniques that can use multiple explanatory variables for a single prediction. 

<details>
<summary>learn more</summary>

- [Wikipedia](https://en.wikipedia.org/wiki/Linear_regression)
</details>
<br>

Additionally, we explored a fixed effect model and a random effect model. The fixed effect model was used to account for individual-specific effects. Dummy variables were created for each ZIP code, and the model was fitted using linear regression. The results from the fixed effects model showed statistically significant features including employee count (emp), average payroll (ap), and the various employee size categories (ni_j_pct).

The random effect model looked for unobserved heterogeneity at the individual level. Just as the fixed effects model it was fitted with a linear regression. The random effect model saw significance in average payroll (ap) and employee size categories. There was a high adjusted R-squared value indicating a high explanatory power when compared to the random effect model. Based on the evaluation and statistical significance of predictors, we concluded that the fixed effect model provided the best fit for our data, capturing both observed and unobserved heterogeneity at the ZIP code level.


### Autoregressive Integrated Moving Average (ARIMA)

![arima](/assets/images/arima.png)  

The autoregressive integrated moving average (ARIMA) is a classical model used for statistical time-series analysis which makes predictions purely off trends in the dependent variable, after accounting for stationarity, and is unable to utilize multiple explanatory variables. As previous mentioned, it is currently the state-of-the-art architecture for in-production birth-death forecasting.

<details>
<summary>learn more</summary>

- [Wikipedia](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average)
</details>
<br>

Because of the inability of ARIMA models to take in explanatory variables, we were unable to feed it any information regarding individual ZIP codes. As such, an important distinction of our approach is that we trained one ARIMA model for each ZIP code, to avoid a singular ARIMA model predicting the same value for every ZIP-code.

### Random Forest Regression

![randomforest](/assets/images/random_forest.png)  

Random forest models are a popular “catch-all” type of model and a common example of
“Algorithmic Modeling”. Because it assumes little to nothing about the data, it often performs well on all sorts of datasets, making it a good candidate for our problem.

<details>
<summary>learn more</summary>

- [Wikipedia](https://en.wikipedia.org/wiki/Random_forest)
</details>
<br>

As a trade-off for making little to no assumptions about the data, random forest models, and decision trees in general, are prone to overfitting. As such, we developed and implemented a rolling time series cross-validation system with an expansive range of parameters to discover the best hyperparameters for our problem and improve model generalizability.

<details>
<summary>learn more</summary>

- [Time Series Cross-Validation](https://otexts.com/fpp3/tscv.html)
</details>
<br>

### Long Short Term Memory Recurrent Neural Network (LSTM)

![rnn](/assets/images/rnn.png)  

![lstm](/assets/images/lstm.png)  

The long short-term memory network is a modified recurrent neural network introduced by Hochreiter and Schmidhuber in 1997 (Hochreiter and Schmidhuber 1997). As a reccurent neural network, it is cheifly capable of taking in an arbitrary number of explanatory variables at each time step, inheriting the advantages of both multiple linear regression and ARIMA models.

Its specific adjustments, over traditional recurrent neural networks, allow the model to retain a "memory" of previous time-steps over extended time intervals, making it particularly suitable for prediction tasks where information from 1000 or more timesteps ago may be relavent. For that reason, it has the potential to predict recessions, which are often significantly spaced apart and not dependent on seasonality, than ARIMA models.

<details>
<summary>learn more</summary>

- [Neural Net](https://en.wikipedia.org/wiki/Neural_network_(machine_learning))
- [RNN](https://en.wikipedia.org/wiki/Recurrent_neural_network)
- [LSTM](https://en.wikipedia.org/wiki/Long_short-term_memory)
</details>
<br>

We made a modification from the traditional LSTM architecture following previous work by Alex Graves, to introduce an autoregresive feedback loop. This allows the model to make forecasts into the future without accompanying data on independent variables.

<details>
<summary>learn more</summary>

- [Generating Sequences With Recurrent Neural Networks](https://arxiv.org/abs/1308.0850)
</details>

## Model Evaluation

To simplify training and maintain consistency with previous works, we trained and evaluated our model performances with root mean squared error (RMSE). 

For forecasting evaluation, we considered two different scenarios: short-term forecasting and long-term forecasting. To evaluate our models’ short-term forecasting capabilities, we trained them on data from 2012 to 2020 and evaluated them against observed data for 2021. For long-term forecasting, we would preferably evaluate forecasting performance for years 5-15 years after our training data. However, due to the limited data we had available, we trained our models on data from 2012 to 2018 and evaluated them against observed data from 2019 to 2021. 

![model_evaluations](/assets/images/model_evaluations.png)  

## Summary of Findings

We hypothesize that certain models(maybe rf) performs better on short-term forecasting, while ARIMA and LSTM performs better on long-term.

Significantly increasing the number of years of data we have access to should improve LSTMs long-shot performance in relation to ARIMA, as ARIMA mostly just adjusts for seasonality, while LSTMs can retain any relavent information 

## Future Work

Repeating our analyses with restricted data:

- Potentially have access to more records: before 2012 and after 2021
- Potentially have access to finer grained data: geographically and temporally
  - geographically finer could allow the models to learn more nuanced patterns
  - temporally finer data and more records would mean more timestamps available to train on, which would reveal the potential of the time-series based models (ARIMA and LSTM) better than our work

Exploration into more/stronger explanatory variables could improve model performance

Exploration into forecasting consequences and fairness, by training/evaluating on different metrics as mentioned above, may see significance by reducing the scale of consequnces from mistakes made referencing the forecasts.
- other metrics based on consequences of over/under-estimation and/or impacts on different types of zipcodes (ex: smaller zipcodes may suffer more from prediction error)

- not sure this is currently considered by SANDAG

## References

Lorem ipsum