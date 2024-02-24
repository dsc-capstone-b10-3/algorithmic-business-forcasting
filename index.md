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

For data to be used as explanatory variables, we collected the following ZCTA indexed socio-demographic and economic datasets from the U.S. Census:
- ZIP Code Business Patterns Details
  - industry details data
- American Community Survey ???:
  - population demographics data (age)
- American Community Survey ???
  - employment counts data
- American Community Survey DP02
  - household counts data
- American Community Survey ??? (B19013?)
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

Distributions over ZIP codes: Geoplots

- est, small businesses, big businesses

Distributions over Time: mean agg lineplots and/or cherry picked zipcodes?

- population and employment?


Range of Values: violin plots

- everything?

## Modeling Architecture

OLS AND RF USED LAGGED DATA WHILE OTHER 2 DID NOT

We chose 2 candidate model architectures each for statistical and algorthmic modeling: a simple baseline model, and our "best" candidate

Proceed to describe the model architectures and motivating factors.

LSTM:
- exploits both long and wide data
- can be adjusted to make autoregressive predictions and forecast out into the future without accompanying data for independent variables
- "memory" feature may perform better in forecasting recession years than ARIMA.

List training details as a dropdown for each model when necessary

## Model Evaluation

Models were trained and evaluated on RMSE for simplicity and consistency with other papers

- other metrics may be explored based on consequences of over/under-estimation and/or impacts on different types of zipcodes (ex: smaller zipcodes may suffer more from prediction error)

Models were evaluated on their short-term and long-term forecasting capabilities:

- short-term: prediction accuracy for the immediate next year
  - trained on 2012-2020 and tested on 2021
- long-term: prediction accuracy for forecasting multiple years down the line
  - preferably evaluated on forecasts 5-15 years after the training data
  - trained on 2012-2018 and tested on 2019-2021

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

- not sure this is currently considered by SANDAG

## References

Lorem ipsum