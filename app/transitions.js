export default function() {
  this.transition(
    this.fromRoute('find'),
    this.toRoute('board'),
    this.use('toLeft', { duration: 500 }),
    this.reverse('toRight', { duration: 500 })
  );
}
