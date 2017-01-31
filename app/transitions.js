export default function() {
  this.transition(
    this.fromRoute('find'),
    this.toRoute('board'),
    this.use('toLeft', { duration: 250 }),
    this.reverse('toRight', { duration: 250 })
  );
}
