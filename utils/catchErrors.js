const catchErrors = (error, displayError) => {
  let errorMsg;
  if (error.response) {
    // Request was made, server responded status other than 2XX
    errorMsg = error.response.data;
    console.error('Error response', errorMsg);

    // For Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // Request was made, no response
    errorMsg = error.request;
    console.error('Error request', errorMsg);
  } else {
    errorMsg = error.message;
    console.error('Error message', errorMsg);
  }
  displayError(errorMsg);
};

export default catchErrors;
