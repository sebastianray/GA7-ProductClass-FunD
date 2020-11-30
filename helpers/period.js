function setDate(date, day) {

  date = new Date(date);
  date.setDate(day);
  date.setHours(23);

  return date;

}

const monthly = function (date1, date2) {

  let range1 = new Date(date1),
    range2 = new Date(date2),
    day = range1.getDate()
    date1 = setDate(date1, day),
    date2 = setDate(date2, day),
    dates = [],
    temp = null;

  while (date1 <= date2) {
    if (date1.getDate() != day) {
      temp = setDate(date1, 0);
      if (temp >= range1 && temp <= range2.setMonth(range2.getMonth() + 1)) dates.push(temp);
      date1 = setDate(date1, day);
    } else {
      temp = new Date(date1);
      if (temp >= range1 && temp <= range2.setMonth(range2.getMonth() + 1)) dates.push(temp);
      date1.setMonth(date1.getMonth() + 1);
    }
  }
  let arraydates = []
  dates.forEach(el => {
    newdates = new Date(el).toISOString('id-ID').substring(0, 10);
    arraydates.push(newdates)
  })
  return arraydates
};

const daily = function (start, end) {
  for (var arr = [], dt = new Date(new Date(start)); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  let arraydates = []
  arr.forEach(el => {
    newdates = new Date(el).toISOString('id-ID').substring(0, 10);
    arraydates.push(newdates)
  })
  return arraydates
};

const weekly = function (startDate, endDate) {
  let intervalType = 'Date';
  let date = new Date(startDate);
  let recurrent = [];
  let setget = {
    set: 'set' + intervalType,
    get: 'get' + intervalType
  };

  while (date < new Date(endDate)) {
    recurrent.push(new Date(date));
    date[setget.set](date[setget.get]() + 7);
  }
  let arraydates = []
  recurrent.forEach(el => {
    newdates = new Date(el).toISOString('id-ID').substring(0, 10);
    arraydates.push(newdates)
  })
  return arraydates
}

const yearly = function (date1, date2) {

  let range1 = new Date(date1),
    range2 = new Date(date2),
    day = range1.getDate()
  date1 = setDate(date1, day),
    date2 = setDate(date2, day + 30),
    dates = [],
    temp = null;

  while (date1 <= date2) {
    if (date1.getDate() != day) {
      temp = setDate(date1, 0);
      if (temp >= range1 && temp <= range2.setFullYear(range2.getFullYear() + 1)) dates.push(temp);
      date1 = setDate(date1, day - 1);
    } else {
      temp = new Date(date1);
      if (temp >= range1 && temp <= range2.setFullYear(range2.getFullYear() + 1)) (dates.push(temp))
      if (temp.getMonth() != date1.getMonth()) (temp = setMonth(date1))
    }
    date1.setFullYear(date1.getFullYear() + 1);
  }
  let arraydates = []
  dates.forEach(el => {
    newdates = new Date(el).toISOString('id-ID').substring(0, 10);
    arraydates.push(newdates)
  })
  return arraydates
};

const subslimitdates = function (date) {
  let toDate = new Date(date)
  let month = toDate.getMonth()
  let nextDate = new Date(toDate.setMonth(month + 1)).toISOString('id-ID').substring(0, 10)
  return nextDate
}

module.exports = {
  yearly, monthly, weekly, daily, subslimitdates
}

