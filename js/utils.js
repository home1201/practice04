export const fetchJSON = url => fetch(url).then(res => {
  if (!res.ok) { throw Error(res.statusText); }
  return res.json();
}).catch(err => {
  throw err;
});
