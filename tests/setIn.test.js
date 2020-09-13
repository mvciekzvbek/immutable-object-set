import { expect } from "chai";
import { setIn } from "../src/setIn";

describe('setIn should perform immutable set', () => {
  it('should throw an error when first argument is not an array', () => {
    const o = {
      a: 1
    };
    expect(() => {setIn('a', 2, o)}).to.throw('First argument should be an array');
  });
  it('should throw an error when third argument is an array', () => {
    const o = [];
    expect(() => {setIn(['a'], 2, o)}).to.throw('Third argument should not be an array');
  });
  it('should throw an error when executed with less than 3 arguments', () => {
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
    expect(() => {setIn(['a'], 2)}).to.throw('Function needs to be called with 3 arguments');
  });  
  it('shallow', () => {
    const o = {
      a: 1,
      b: {},
      c: [],
    };
    const n = setIn(['a'], 2, o);      
    expect(o).not.to.deep.equal(n);
    expect(n.a).to.equal(2);
    expect(o.a).to.equal(1);
    expect(o.b).to.equal(n.b);
    expect(o.c).to.equal(n.c);
  });
  it('shallow - number instead of object', () => {
    const o = {
      a: 1,
      b: {},
      c: [],
    };
    const n = setIn(['b'], 2, o);   
    expect(o).not.to.deep.equal(n);
    expect(n.a).to.equal(1);
    expect(o.a).to.equal(1);
    expect(n.b).to.equal(2);
    expect(o.c).to.equal(n.c);
  });
  it('shallow - number instead of array', () => {
    const o = {
      a: 1,
      b: {},
      c: [],
    };
    const n = setIn(['c'], 2, o);      
    expect(o).not.to.deep.equal(n);
    expect(n.a).to.equal(1);
    expect(o.a).to.equal(1);
    expect(o.b).to.equal(n.b);
    expect(o.c).to.deep.equal([]);
    expect(n.c).to.equal(2);
  });
  it('shallow - adding nested value', () => {
    const o = {
      a: 1,
      b: {},
      c: [],
    };
    const n = setIn(['a','b'], 2, o);      
    expect(o).not.to.deep.equal(n);
    expect(n.a.b).to.equal(2);
    expect(o.a).to.equal(1);
    expect(o.b).to.equal(n.b);
    expect(o.c).to.deep.equal(n.c);
  }); 
  it('deep - number', () => {
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
    expect(o.a.b.c.d).to.equal(1);        
    expect(o.u).to.deep.equal(n.u);
    expect(n.u).not.to.be.undefined;
  });
  it('deep - string', () => {
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
    const n = setIn(['a', 'b', 'c', 'd'], 's', o);
    expect(o).not.to.deep.equal(n);
    expect(o.a).not.deep.equal(n.a);
    expect(o.a.b).not.to.deep.equal(n.a.b);
    expect(o.a.b.c).not.to.deep.equal(n.a.b.c);
    expect(o.a.b.c.d).not.to.equal(n.a.b.c.d);        
    expect(n.a.b.c.d).to.equal('s');
    expect(o.a.b.c.d).to.equal(1);        
    expect(o.u).to.deep.equal(n.u);
    expect(n.u).not.to.be.undefined;
  });
  it('deep - array', () => {
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
    const n = setIn(['a', 'b', 'c', 'd'], [2, 3, 4, 5], o);
    expect(o).not.to.deep.equal(n);
    expect(o.a).not.deep.equal(n.a);
    expect(o.a.b).not.to.deep.equal(n.a.b);
    expect(o.a.b.c).not.to.deep.equal(n.a.b.c);
    expect(o.a.b.c.d).not.to.equal(n.a.b.c.d);        
    expect(n.a.b.c.d).to.deep.equal([2, 3, 4, 5]);
    expect(o.a.b.c.d).to.equal(1);        
    expect(o.u).to.deep.equal(n.u);
    expect(n.u).not.to.be.undefined;
  });
  it('deep - 1st level depth', () => {
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
    const n = setIn(['u'], 2, o);
    expect(o).not.to.deep.equal(n);
    expect(o.a).to.deep.equal(n.a);
    expect(o.a.b).to.to.deep.equal(n.a.b);
    expect(o.a.b.c).to.to.deep.equal(n.a.b.c);
    expect(o.a.b.c.d).to.to.equal(n.a.b.c.d);              
    expect(o.u).not.to.deep.equal(n.u);
    expect(n.u).to.equal(2);
  });  
  it('deep - not existing property', () => {
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
    const n = setIn(['a', 'b', 'c', 'd', 'e'], 2, o);
    expect(o).not.to.deep.equal(n);
    expect(o.a).not.deep.equal(n.a);
    expect(o.a.b).not.to.deep.equal(n.a.b);
    expect(o.a.b.c).not.to.deep.equal(n.a.b.c);
    expect(o.a.b.c.d).not.to.equal(n.a.b.c.d);
    expect(n.a.b.c.d.e).to.equal(2);  
    expect(o.a.b.c.d).to.equal(1);        
    expect(o.u).to.deep.equal(n.u);
    expect(n.u).not.to.be.undefined;
  });
});