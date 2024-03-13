"use strict";(self.webpackChunkalgorithmic_business_forecasting=self.webpackChunkalgorithmic_business_forecasting||[]).push([[9119],{4492:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>n,metadata:()=>a,toc:()=>d});var o=s(4848),r=s(8453);const n={sidebar_label:"Results",sidebar_position:4},i="Results",a={id:"results",title:"Results",description:"How We Evaluated Our Models",source:"@site/docs/results.md",sourceDirName:".",slug:"/results",permalink:"/algorithmic-business-forcasting/docs/results",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/results.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_label:"Results",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"(Algorithmic) LSTM Neural Net",permalink:"/algorithmic-business-forcasting/docs/models/model_4"},next:{title:"Future Work",permalink:"/algorithmic-business-forcasting/docs/conclusion"}},l={},d=[{value:"How We Evaluated Our Models",id:"how-we-evaluated-our-models",level:2},{value:"Our Final Results",id:"our-final-results",level:2}];function u(e){const t={h1:"h1",h2:"h2",p:"p",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"results",children:"Results"}),"\n",(0,o.jsx)(t.h2,{id:"how-we-evaluated-our-models",children:"How We Evaluated Our Models"}),"\n",(0,o.jsx)(t.p,{children:"To simplify training and maintain consistency with previous works, we trained and evaluated our model performances using root mean squared error (RMSE)."}),"\n",(0,o.jsx)(t.p,{children:"For forecasting evaluation, we considered two different use case scenarios: immediate nextyear forecasting and long-term forecasting. To evaluate our models\u2019 immediate next-year\nforecasting capabilities, we trained them on data from 2012 to 2020 and evaluated them\nagainst observed data for 2021. For long-term forecasting, we would preferably evaluate\nforecasting performance tens of years after our training data, as SANDAG does with their\nSeries 14 Forecasts(SANDAG 2018), forecasting out to 2050 using a base year of 2016.\nHowever, with a limited range of years available to us, we chose to train our models on\ndata from 2012 to 2018 and evaluate them against observed data from 2019 to 2021."}),"\n",(0,o.jsx)(t.h2,{id:"our-final-results",children:"Our Final Results"}),"\n",(0,o.jsx)(t.p,{children:"INSERT EVALUATIONS"}),"\n",(0,o.jsx)(t.p,{children:"INSERT TEST LINEPLOTS"}),"\n",(0,o.jsx)(t.p,{children:"We see that our ordinary least squares models, including LASSO, perform the best in terms\nof RMSE, and predict closest to actual establishment growth, likely because their assumptions of monotonic growth are reflected in both our training and testing data."}),"\n",(0,o.jsx)(t.p,{children:"Like our ordinary least squares models, our ARIMA model appears to underestimate establishment growth year after year. However, due to it making predictions by averaging the\nlast few timestamps, each under-prediction further reduces the next prediction, resulting in\nsignificant under-prediction compared to our other models. In actuality, though, this result\nof conservatively underestimating establishment growth may be preferred to an alternative\nof compounding overprediction when it comes to the forecast\u2019s influence on planning decisions."}),"\n",(0,o.jsx)(t.p,{children:"While our \u201dAlgorithmic Models\u201d, random forest and LSTM, perform poorly in terms of\nRMSE, they exhibit more \u201ddynamic\u201d predictions than our \u201cStatistical Models\u201d, in that, their\nforecasts change more drastically than our \u201cStatistical Models\u201d, which are mostly predicting the same number of new establishments every subsequent year. This indicates some\npotential for the \u201cAlgorithmic Models\u201d to outperform \u201cStatistical Models\u201d in cases where\nrecession years are accounted for. Another potential reason for their higher RMSEs could\nsimply be due to the number of records we used for training, as without enough diverse\ntraining data, our \u201cAlgorithmic Models\u201d resort to overfitting on the train set."}),"\n",(0,o.jsx)(t.p,{children:"Our results conclude that \u201cStatistical Models\u201d outperform \u201cAlgorithmic Models\u201d in forecasting establishment counts by ZIP Code, with LASSO regression coming onto with an immediate next year and long-term testing RMSE of 22.83 and 20.04 respectively. However,\nwe believe that the data we resorted to using, due to various data limitations, significantly\ninfluenced this outcome, as a lack of recession years coincidentally fit the assumptions of\nour ordinary least squares models, where the real-world phenomena may not."})]})}function c(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>i,x:()=>a});var o=s(6540);const r={},n=o.createContext(r);function i(e){const t=o.useContext(n);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(n.Provider,{value:t},e.children)}}}]);