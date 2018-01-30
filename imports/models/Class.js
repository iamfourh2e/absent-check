import {Class} from '../collections/class';
class KlassModel {
    insert(doc){
        return Class.insert(doc)
    }
    fetch(selector){
        return Class.find(selector).fetch();
    }
    upsert(querySelector,selector){
        return Class.update(querySelector,selector,{upsert: true});
    }
    update(querySelector, selector){
        return Class.update(querySelector,selector);
    }
    removeSelector(selector){
        return Class.remove(selector)
    }
}
export default new KlassModel();