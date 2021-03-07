describe('date-fns adapter', function() {
  it('should format correctly using format presets', function() {
    const adapter = new Chart._adapters._date({timeZone: 'UTC'});
    expect(adapter).toBeDefined();

    const formats = adapter.formats();
    expect(formats).toEqual({
      datetime: 'MMM d, yyyy, h:mm:ss aaaa',
      millisecond: 'h:mm:ss.SSS aaaa',
      second: 'h:mm:ss aaaa',
      minute: 'h:mm aaaa',
      hour: 'ha',
      day: 'MMM d',
      week: 'PP',
      month: 'MMM yyyy',
      quarter: 'qqq - yyyy',
      year: 'yyyy'
    });

    const timestamp = adapter.parse('2019-05-28T15:10:27.000');
    expect(adapter.format(timestamp, formats.year)).toEqual('2019');
    expect(adapter.format(timestamp, formats.quarter)).toEqual('Q2 - 2019');
    expect(adapter.format(timestamp, formats.month)).toEqual('May 2019');
    expect(adapter.format(timestamp, formats.week)).toEqual('May 28, 2019');
    expect(adapter.format(timestamp, formats.day)).toEqual('May 28');
    expect(adapter.format(timestamp, formats.hour)).toEqual('3PM');
    expect(adapter.format(timestamp, formats.minute)).toEqual('3:10 p.m.');
    expect(adapter.format(timestamp, formats.second)).toEqual('3:10:27 p.m.');
    expect(adapter.format(timestamp, formats.millisecond)).toEqual('3:10:27.000 p.m.');
    expect(adapter.format(timestamp, formats.datetime)).toEqual('May 28, 2019, 3:10:27 p.m.');
  });
});
