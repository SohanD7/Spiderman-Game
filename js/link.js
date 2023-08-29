class Link
{
    constructor(bodyA,bodyB)
    {
        this.link = Constraint.create(
            {
                bodyA: bodyA,
                bodyB: bodyB,
                length: 0,
                stiffness: 0.001
            }
        )
        World.add(world,this.link);
    }

    detatch(bodyA,bodyB)
    {
        this.link = null;
        World.remove(world,this.link);
    }

    display()
    {
        var pointA = this.link.bodyA.position;
        var pointB = this.link.bodyB.position;
        strokeWeight(1);
        stroke("red");
        fill("red");
        line(pointA.x,pointA.y,pointB.x,pointB.y);
    }
}