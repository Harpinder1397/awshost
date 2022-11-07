module.exports = {
  type: {
    required: {
      errorMsg: "Type is required",
    },
  },
  serviceType: {
    required: {
      errorMsg: "Service Type is required",
    },
  },
  state: {
    required: {
      errorMsg: "State is required",
    },
  },
  name: {
    required: {
      errorMsg: "Name is required",
    },
  },
  email: {
    required: {
      errorMsg: "Email is required",
    },
    email: {
      errorMsg: "Email is invalid",
    },
  },
}
