export function numberToWords(num) {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
             'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
             'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const two = n => n < 20 ? a[n] : b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
  const three = n => n >= 100 ? a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + two(n % 100) : '') : two(n);

  if (num === 0) return 'Zero Only';
  if (num > 999999999) return 'Overflow';

  const parts = [
    [Math.floor(num / 10000000), 'Crore'],
    [Math.floor((num / 100000) % 100), 'Lakh'],
    [Math.floor((num / 1000) % 100), 'Thousand'],
    [Math.floor(num % 1000), '']
  ];

  return parts
    .map(([n, label], i) => i === 3 ? three(n) : n ? two(n) + ' ' + label : '')
    .filter(Boolean)
    .join(' ')
    .trim() + ' Only';
}
