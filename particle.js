var particle = {
	position: null,
	velocity: null,
	mass: 1,

	create: function(x, y, speed, direction, accel) {
		var obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.velocity = vector.create(0, 0);
		obj.velocity.setLength(speed);
		obj.velocity.setAngle(direction);
		return obj;
	},

	accelerate: function(accel) {
		this.velocity = this.velocity.add(accel);
	},

	update: function() {
		this.position = this.position.add(this.velocity);
	},

	angleTo: function(p2) {
		return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
	},

	distanceTo: function(p2) {
		var dx = p2.position.getX() - this.position.getX();
		var dy = p2.position.getY() - this.position.getY();

		return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	},

	gravitateTo: function(p2) {
		var grav = vector.create(0, 0);
		var dist = this.distanceTo(p2);

		grav.setLength(p2.mass / (Math.pow(dist, 2)));
		grav.setAngle(this.angleTo(p2));

		this.velocity = this.velocity.add(grav);
	},
};