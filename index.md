---
title: "Forecasting Business Growth with Algorithmic Modeling"
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

# Table of Contents
- [Introduction](#introduction)
- [Methodology](#methodology)
    - [Data](#data)
    - [Data Preparation](#data-preparation)
    - [Feature Transformation](#feature-transformation)
    - [Data Analysis](#data-analysis)
- [Models](#models)
- [Results](#results)
    - [Model Evaluations](#model-evaluations)
    - [Discussion](#discussion)
- [Conclusion](#conclusion)
- [Future Work](#future-work)


## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus tellus, finibus quis rhoncus vel, gravida eu arcu. Nulla maximus sem sapien, sed tempor risus rhoncus ac. Nunc porta augue ut sem suscipit, sed facilisis mi sollicitudin. Pellentesque lobortis blandit interdum. Curabitur at nunc erat. Quisque dolor dui, sodales vel est id, mollis cursus augue. Integer scelerisque mi sit amet fermentum tempus. Quisque sollicitudin blandit ante. Sed pulvinar vel tortor cursus suscipit. Sed tincidunt porttitor risus a blandit. Morbi in scelerisque nulla. Aenean orci massa, iaculis ac erat a, laoreet consectetur justo. Nulla erat lacus, tempor id lorem eget, ullamcorper finibus metus. Donec nulla lorem, molestie in lacus vitae, efficitur mattis quam.

## Methodology

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus tellus, finibus quis rhoncus vel, gravida eu arcu. Nulla maximus sem sapien, sed tempor risus rhoncus ac.

### Data

We approached the data sourcing issue from the perspective of the general public, without any special government clearances. To this end, we sourced and combined an array of publically available datasets on business births/deaths and socio-economic demographics, mostly originating from the U.S. Census Bureau. 

The data we primarily used were the County Business Patterns (CBP) and American Community Survey (ACS) datasets obtained from the U.S. Census Bureau. The County Business Patterns is a set of annually updated datasets that provides economic data on establishments and employees at various subnational aggregation levels. The American Community Survey contains various demographic estimate datasets by year and also at various subnational aggregation levels. For our purposes, we chose to focus on zip-code level data as it was the smallest level of aggregation available. Specifically, we chose to utilize the ZIP Code Totals, ZIP Code Industry Details,  ZIP Code Demographic and Housing Estimates, ZIP Code Selected Social Characteristics in the United States, and ZIP Code Income in the Past 12 Months datasets, choosing to only focus on zip codes within the San Diego region. For simplicity’s sake, we chose to use only data from 2012 to 2021. As a comparison to extant business growth forecasts, we also utilized SANDAG Series 14 forecasts, specifically their forecasts on Jobs by ZIP Code. 

### Data Preparation

We first began by preprocessing the data into data frames and reformatting the tables so that we could work zip codes as a column rather than a header within the data. We then concatenated all of the individual yearly sub-datasets into one dataset with all the years from 2012-2021 for each of the five data sources mentioned above. Afterward, we cleaned and filtered out only the features that were relevant to our task of predicting business establishment growth from the data tables we gathered. We decided to drop zip codes with incomplete observations as afterward we were still left with a majority of San Diego zip codes with complete observations across all datasets. After creating some additional features explained in the following section, we merged all of the datasets for each year into one master table. As our main predictive task was to predict the number of establishments for each zip code annually, we merged all the datasets by zip code and year. 

### Feature Transformation

To predict establishment counts in each zip code, we first needed our data to be observations on the zip code level. To do this, we took the ZBP Totals dataset as our master table and merged in zip-code level features we transformed from the ZBP Details dataset. The ZBP Details dataset included key information about the distribution of industries and establishment sizes within zip codes. We hypothesized that this information would play a significant role in predicting employment growth in certain zip codes, as certain industries or business types may see slower/faster growth. For example, San Diego’s booming biotech industry may see more growth than the mining sector. Or that small companies may see more growth than large and old corporations and may be busy focusing on company politics rather than innovation. 

To make sense of this information, we created features encoding the proportion of establishments of a certain industry or establishment size within each zip code. For every Naics industry code in our data, we created a feature called naics_x_pct, and for every establishment size bin in our data, we created a feature called ni_j_pct.

![naicsnijformulas](/assets/images/naicsnijformulas.png)  

Additionally, using the Housing and Demographics dataset, we created a total_retirement population estimate feature by summing the estimates for populations greater or equal to age 65. We also chose to observe the mid-career working populations and split those features into the age groups 25-34 and 35-44 to observe any differences between them. 

After all feature transformations were finalized, we merged all of the datasets by zip code and year pairs and lagged all variables excluding zip, year, and est.

![masterdataset](/assets/images/master_dataset.png)  

### Data Analysis

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus tellus, finibus quis rhoncus vel, gravida eu arcu. Nulla maximus sem sapien, sed tempor risus rhoncus ac. Nunc porta augue ut sem suscipit, sed facilisis mi sollicitudin. Pellentesque lobortis blandit interdum. Curabitur at nunc erat. Quisque dolor dui, sodales vel est id, mollis cursus augue. Integer scelerisque mi sit amet fermentum tempus. Quisque sollicitudin blandit ante. Sed pulvinar vel tortor cursus suscipit. Sed tincidunt porttitor risus a blandit. Morbi in scelerisque nulla. Aenean orci massa, iaculis ac erat a, laoreet consectetur justo. Nulla erat lacus, tempor id lorem eget, ullamcorper finibus metus. Donec nulla lorem, molestie in lacus vitae, efficitur mattis quam.

## Models

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus tellus, finibus quis rhoncus vel, gravida eu arcu. Nulla maximus sem sapien, sed tempor risus rhoncus ac. Nunc porta augue ut sem suscipit, sed facilisis mi sollicitudin. Pellentesque lobortis blandit interdum. Curabitur at nunc erat. Quisque dolor dui, sodales vel est id, mollis cursus augue. Integer scelerisque mi sit amet fermentum tempus. Quisque sollicitudin blandit ante. Sed pulvinar vel tortor cursus suscipit. Sed tincidunt porttitor risus a blandit. Morbi in scelerisque nulla. Aenean orci massa, iaculis ac erat a, laoreet consectetur justo. Nulla erat lacus, tempor id lorem eget, ullamcorper finibus metus. Donec nulla lorem, molestie in lacus vitae, efficitur mattis quam.

## Results

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus tellus, finibus quis rhoncus vel, gravida eu arcu.

### Model Evaluation

We evaluated our model performances by computing their prediction root mean squared errors (RMSE) in two different scenarios: short-term forecasting and long-term forecasting. To evaluate our models’ short-term forecasting capabilities, we trained them on data from 2012 to 2020 and evaluated them against observed data for 2021. For long-term forecasting, we trained our models on data from 2012 to 2018 and evaluated them against observed data from 2019 to 2021. For a comparison to current forecasting techniques used by government planning organizations, we also compared our models against SANDAG’s Series 14 forecasts on Jobs by ZIP Code

![model_evaluations](/assets/images/model_evaluations.png)  


### Discussion

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus tellus, finibus quis rhoncus vel, gravida eu arcu. Nulla maximus sem sapien, sed tempor risus rhoncus ac. Nunc porta augue ut sem suscipit, sed facilisis mi sollicitudin. Pellentesque lobortis blandit interdum. Curabitur at nunc erat. Quisque dolor dui, sodales vel est id, mollis cursus augue. Integer scelerisque mi sit amet fermentum tempus. Quisque sollicitudin blandit ante. Sed pulvinar vel tortor cursus suscipit. Sed tincidunt porttitor risus a blandit. Morbi in scelerisque nulla. Aenean orci massa, iaculis ac erat a, laoreet consectetur justo. Nulla erat lacus, tempor id lorem eget, ullamcorper finibus metus. Donec nulla lorem, molestie in lacus vitae, efficitur mattis quam.

## Conclusion

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus tellus, finibus quis rhoncus vel, gravida eu arcu. Nulla maximus sem sapien, sed tempor risus rhoncus ac. Nunc porta augue ut sem suscipit, sed facilisis mi sollicitudin. Pellentesque lobortis blandit interdum. Curabitur at nunc erat. Quisque dolor dui, sodales vel est id, mollis cursus augue. Integer scelerisque mi sit amet fermentum tempus. Quisque sollicitudin blandit ante. Sed pulvinar vel tortor cursus suscipit. Sed tincidunt porttitor risus a blandit. Morbi in scelerisque nulla. Aenean orci massa, iaculis ac erat a, laoreet consectetur justo. Nulla erat lacus, tempor id lorem eget, ullamcorper finibus metus. Donec nulla lorem, molestie in lacus vitae, efficitur mattis quam.

## Future Work

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus tellus, finibus quis rhoncus vel, gravida eu arcu. Nulla maximus sem sapien, sed tempor risus rhoncus ac. Nunc porta augue ut sem suscipit, sed facilisis mi sollicitudin. Pellentesque lobortis blandit interdum. Curabitur at nunc erat. Quisque dolor dui, sodales vel est id, mollis cursus augue. Integer scelerisque mi sit amet fermentum tempus. Quisque sollicitudin blandit ante. Sed pulvinar vel tortor cursus suscipit. Sed tincidunt porttitor risus a blandit. Morbi in scelerisque nulla. Aenean orci massa, iaculis ac erat a, laoreet consectetur justo. Nulla erat lacus, tempor id lorem eget, ullamcorper finibus metus. Donec nulla lorem, molestie in lacus vitae, efficitur mattis quam.