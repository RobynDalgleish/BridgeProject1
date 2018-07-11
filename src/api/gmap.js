const { REACT_APP_GMAP_API_KEY } = process.env;

const GMAP_API_BASE_URL = "https://maps.googleapis.com/maps/api/";

const objectToQueryParams = params =>
  Object.keys(params)
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join("&");

export const fetchGmapEndpoint = (endpoint, params, options = {}) =>
  fetch(`${GMAP_API_BASE_URL}${endpoint}?${objectToQueryParams(params)}`, {
    ...options,
    headers: {
      Authorization: `Token ${REACT_APP_GMAP_API_KEY}`
    }
  }).then(res => res.json());
