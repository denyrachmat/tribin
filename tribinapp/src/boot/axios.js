import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'

// const $q = useQuasar()

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: process.env.API})

// const api = axios.create({ baseURL: "https://joss.jatpowerindo.co.id/api/"})
// const api_web = axios.create({ baseURL: "https://joss.jatpowerindo.co.id/"})
const api = axios.create({ baseURL: "http://tribin.test/api/"})
const api_web = axios.create({ baseURL: "http://tribin.test/"})

api.interceptors.request.use((config) => {
  config.withCredentials = true

  return config
})

api_web.interceptors.request.use((config) => {
  config.withCredentials = true

  return config
})

api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
    // console.log(response);
  return response;
}, function (e) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
    console.log(e);
  let errors
  if (e.response) {
    if (e.response.status == 422) {
      errors = e.response.data.message;
      if (errors) {
        Object.keys(errors).map((val) => {
          errors[val].map((val_det) => {
            Notify.create({
              color: "negative",
              message: val_det,
            });
          });
        });
      } else {
        if (blob) {
          var decodedString = String.fromCharCode.apply(
            null,
            new Uint8Array(e.response.data)
          );

          Notify.create({
            color: "negative",
            message: decodedString,
          });
        } else {
          Notify.create({
            color: "negative",
            message: "Undefined error!!",
          });
        }
      }
    }

    if (e.response.status == 406) {
      errors = e.response.data

      errors.map((valErr, idx) => {
        valErr.map((valErrDet) => {
          Notify.create({
            color: "negative",
            message: `${idx} : ${valErrDet}`,
          });
        })
      })
    }

    if (e.response.status == 401) {
      Notify.create({
        color: "negative",
        message: "You need to login to access this function!",
      });
    }

    if (e.response.status == 500) {
      Notify.create({
        color: "negative",
        message: "Something is wrong, please contact administrator",
      });
    }
  }

  // return Promise.reject(errors);
});

api_web.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response.data.message || response.data.msg) {
    Notify.create({
      color: "green",
      message: response.data.message ? response.data.message : response.data.msg,
    });
  }

  return response;
}, function (e) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  // console.log(e)
  if (e.response) {
    if (e.response.status == 422) {
      errors = e.response.data.message;
      if (errors) {
        Object.keys(errors).map((val) => {
          errors[val].map((val_det) => {
            Notify.create({
              color: "negative",
              message: val_det,
            });
          });
        });
      } else {
        if (blob) {
          var decodedString = String.fromCharCode.apply(
            null,
            new Uint8Array(e.response.data)
          );

          Notify.create({
            color: "negative",
            message: decodedString,
          });
        } else {
          Notify.create({
            color: "negative",
            message: "Undefined error!!",
          });
        }
      }
    }

    // console.log(e.response.data)
    if (e.response.status == 406) {
      console.log('masuk sini kena validasi')
      // console.log(Object.values(e.response.data))

      Object.values(e.response.data).map((valErr) => {
        valErr.map((valErrDet) => {
          console.log(valErrDet)
          Notify.create({
            color: "negative",
            message: `${valErrDet}`,
          });
        })
      })
    }

    if (e.response.status == 401) {
      Notify.create({
        color: "negative",
        message: "You need to login to access this function!",
      });
    }

    if (e.response.status == 500) {
      Notify.create({
        color: "negative",
        message: "Something is wrong, please contact administrator",
      });
    }
  }
  // return Promise.reject(error);
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  app.config.globalProperties.$api_web = api_web
  // ^ ^ ^ this will allow you to use this.$api_web (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, api_web }
