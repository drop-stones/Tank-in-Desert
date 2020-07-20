
const P_L_dis = (xa,ya,xb,yb,xp,yp) => {
  if(xa==xb){
    if(ya <= yp && yp <= yb){
      return Math.abs(xa-xp)
    }
    else if(yp < ya){
      return ((xa-xp)**2+(ya-yp)**2)**(1/2)
    }
    else if(yb < yp){
      return  ((xb-xp)**2+(yb-yp)**2)**(1/2)
    }
  }
  if(ya==yb){
    if(xa <= xp && xp <= xb){
      return Math.abs(ya-yp)
    }
    else if(xp < xa){
      return ((xa-xp)**2+(ya-yp)**2)**(1/2)
    }
    else if(xb < xp){
      return ((xb-xp)**2+(yb-yp)**2)**(1/2)
    }
  }
}