---
sidebar_label: "(Statistical) Linear Regression"
sidebar_position: 1
---

# Linear Regression

## How It Works

Linear models, including ordinary least squares, are simple statistical models commonly used in the econometrics domain for their interpretability (Reynolds, Miller and Maki 1995). Multi-variate linear regression models, are one of the simplest modeling techniques that can use multiple explanatory variables for a single prediction.

## Why We Think It's Good

An important point regarding the data modeling
approach of ordinary least squares models is that they can only predict a monotonic increase
or decrease after the training data, making them less dynamic than other models. This
rigidity leads to recession years in training to significantly drag down lines of best fit, while
recession years in testing may be completely over-shot, increasing testing error. However,
given that the data we are working with contain no recession years, it may perform better
than it should.
