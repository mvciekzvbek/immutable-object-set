import { expect } from "chai";
import { setIn } from "../src/setIn";

describe('setIn should perform immutable set', () => {    
  it('shallow', () => {
    const o = {
      a: 1,
      b: {},
      c: [],
    };
    const n = setIn(['a'], 2, o);      
    expect(o).not.to.deep.equal(n);
    expect(n.a).to.equal(2);
    expect(o.a).to.euqal(1);
    expect(o.b).to.equal(n.b);
    expect(o.c).to.equal(n.c);
  });    
  it('deep', () => {
    const o = {
      a: {
        b: {
          c: {
            d: 1
          }
        },
      },
      u: {}
    };
    const n = setIn(['a', 'b', 'c', 'd'], 2, o);
    expect(o).not.to.deep.equal(n);
    expect(o.a).not.deep.equal(n.a);
    expect(o.a.b).not.to.deep.equal(n.a.b);
    expect(o.a.b.c).not.to.deep.equal(n.a.b.c);
    expect(o.a.b.c.d).not.to.equal(n.a.b.c.d);        
    expect(n.a.b.c.d).to.equal(2);
    expect(o.a.b.c.d).to.equall(1);        
    expect(o.u).to.deep.equal(n.u);
    expect(n.u).not.to.be.undefined;
    });
});