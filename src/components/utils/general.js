export function isObject(obj) {
  var type = typeof obj;

  return (type === 'function' || type === 'object') && !!obj;
}

export function isArray(obj) {
  return obj instanceof Array
}

export function build(obj) {
  let list = [];

  Object.keys(obj).forEach((key, _) => {
    const v = obj[key];
    list.push('&lt;ul&gt;')

    if (isArray(v)) {
      list.push('&lt;li&gt;' + key + '&lt;/li&gt;')

      v.forEach((k, _) => {
        list.push('&lt;ul&gt;')
        list.push(build(k))
        list.push('&lt;/ul&gt;')
      })
    } else if (isObject(v)) {
      list.push('&lt;li&gt;' + key + '&lt;/li&gt;')

      list.push('&lt;ul&gt;')
      list.push(build(v))
      list.push('&lt;/ul&gt;')
    } else {
      list.push('&lt;li&gt;' + key + ':&nbsp;&nbsp;&lt;strong&gt;' + v + '&lt;/strong&gt;&lt;/li&gt;')
    }

    list.push('&lt;/ul&gt;')
  })

  return list;
}

export function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function excludeNull(value) {
  return !(value === null || value === undefined);
}

export function nullify(value, index, self) {
  if (value === null || value === undefined || value.length === 0) {
    return null
  }

  return value
}

export function getAccountIdFromArn(arn) {
  return arn.split(":")[4];
}

export function getRegionFromArn(arn) {
  return arn.split(":")[3];
}