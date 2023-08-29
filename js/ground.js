class Ground
{
    constructor(x,y,w,h,color)
    {
        this.groundWidth = w;
        this.groundHeight = h;
        this.x = x;
        this.y = y;
        this.color = color;
        this.body = Bodies.rectangle(this.x,this.y,this.groundWidth,this.groundHeight,{isStatic: true});
        World.add(world,this.body);
    }

    display()
    {
        var p = this.body.position;
        push();
        rectMode(CENTER);
        fill(this.color);
        rect(p.x,p.y,this.groundWidth,this.groundHeight);
        pop();
    }
}