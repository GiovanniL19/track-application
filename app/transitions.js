export default function() {
  this.transition(
    this.fromRoute('find'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('board'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('likes'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('account'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

}
