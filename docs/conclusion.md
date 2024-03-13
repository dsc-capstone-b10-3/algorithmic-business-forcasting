---
sidebar_label: 'Future Work'
sidebar_position: 5
---

# Future Work

Replicating
our project with a longer time series, containing multiple recession years, and introducing
monthly seasonality may better reveal the potential of ”Algorithmic Modeling”, particularly
LSTMs, for business growth forecasting.

Further conclusions about our input features can also be made considering the performance
of our random forest model. Our random forest model performs the worst out of all our
models, with an RMSE of 38.80 for immediate next-year forecasting and 48.99 for 3-year
out forecasting, which indicates that, while our input features may perform well in explaining variation in establishment births/deaths geographically, they do not provide sufficient
explanatory power temporally. As such exploring different avenues for explanatory features
may prove fruitful.

While our work used RMSE for evaluation simplicity, we note that this can lead to our models overfitting on the few ZIP Codes that contain the majority of businesses in the region.
This may potentially lead to comparably worse prediction errors for up-and-coming, developing, ZIP Codes, which are especially in need of developmental support from planning
projects informed by these forecasts. Future work into evaluation metrics for forecasting
models can be explored to mitigate such prediction biases to ensure certain areas are not
disproportionately favored and avoid compounding algorithmic injustice.
