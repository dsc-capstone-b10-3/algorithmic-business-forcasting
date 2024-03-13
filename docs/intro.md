---
sidebar_position: 1
---

# Project Introduction

This is a project created in partnership with The San Diego Association of Governments (SANDAG) under UC San Diego's Halıcıoğlu Data Science Institute undergraduate mentorship program.

Establishment birth and death data are highly significant for understanding the job market and business cycles. Birth data provide a measure of entrepreneurial activities and gauge new entries and reallocation of resources towards growing areas. Similarly, business death data measure failing enterprises and identify sectors from which resources are being shifted away.

Actual values are calculated by government agencies like the U.S. Census Bureau and Bureau of Labor Statistics using national surveys and IRS tax form information. However, are only available with substantial lag, giving value to accurate forecasting.

Currently, SANDAG is predicting growth to anticipate future shifts in establishment growth. They aim to identify areas experiencing current growth trends to forecast where future growth will occur. However, SANDAG's approach suggests that businesses present today will persist unchanged in their predictions for the next 50 years. In contrast, our approach seeks to develop a dynamic predictive model to depart from rigid assumptions.
 
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
