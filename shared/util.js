module.exports = {
  guid () {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  },
  rand (from, to) {
    return Math.floor(Math.random() * to) + from;
  },
};
