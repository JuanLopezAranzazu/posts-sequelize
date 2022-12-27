function compareDates(date1, date2) {
  if (date1.year && date1.month && date1.date) {
    return (
      date1.year === date2.getFullYear() &&
      date1.month === date2.getMonth() + 1 &&
      date1.date === date2.getDate()
    );
  } else if (date1.year && date1.month) {
    return (
      date1.year === date2.getFullYear() && date1.month === date2.getMonth() + 1
    );
  } else if (date1.year && date1.date) {
    return date1.year === date2.getFullYear() && date1.date === date2.getDate();
  } else {
    return (
      date1.month === date2.getMonth() + 1 && date1.date === date2.getDate()
    );
  }
}

function getPostsByDates(posts, dates) {
  return posts.filter((publication) => {
    const { createdAt } = publication;
    return dates.find((date) => {
      return compareDates(date, createdAt);
    });
  });
}

function getPostsByUser(posts, entryArray = [1, 2, 3]) {
  return posts.filter((item) => {
    return entryArray.includes(item.user.id);
  });
}

module.exports = { compareDates, getPostsByDates, getPostsByUser };
