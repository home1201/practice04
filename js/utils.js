export const fetchJSON = (url) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });

export const createElementWithClass = (
  tag,
  className,
  parentClassName = "",
) => {
  const result = document.createElement(tag);

  const resultClassName =
    parentClassName === "" ? className : `${parentClassName}__${className}`;
  result.setAttribute("class", resultClassName);

  return result;
};

export const capitalized = (str) => {
  const firstLetter = str[0].toUpperCase();
  const restString = str.substring(1).toLowerCase();
  return firstLetter + restString;
};
