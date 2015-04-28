Hello modal
=========
modal component

[Try a demo.](http://7li.github.io/components/modal/)

## Config Options

modal can take an optional second parameter– an object of key/value settings:

- **title** String - Modal title html

-	**content** String *(default:160)* - Modal content html

- **close** Function *(default:null)* - Callback when modal is closed

- **scroll** Boolean *(default:true)* - Can document scroll

### Example

``` js

modal({
  title: '<span>foo</span>',
  content: '<div>bar</div>',
  close: function() {
    console.log('modal closed.');
  },
  scoll: false
})

```

## Browser Support
modal is now compatible with all morden webkit browsers

## Who's using modal
Shoot me a [note](mailto:702368372atqqcom) if you want your logo here

## License
Copyright (c) 2015 lyz Licensed under the [The MIT License (MIT)](http://opensource.org/licenses/MIT).
