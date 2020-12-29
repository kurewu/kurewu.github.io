var defaultSchema = {
    'title': 'Upload',
    'type': 'object',
    'required': [
        'name',
        'age',
        'date',
        'favorite_color',
        'gender',
        'pets'
    ],
    'properties': {
        'name': {
            'type': 'string',
            'description': 'First and Last name',
            'minLength': 4,
            'default': 'Jeremy Dorn'
        },
        'age': {
            'type': 'integer',
            'default': 25,
            'minimum': 18,
            'maximum': 99
        },
        'favorite_color': {
            'type': 'string',
            'format': 'color',
            'title': 'favorite color',
            'default': '#ffa500'
        },
        'gender': {
            'type': 'string',
            'enum': [
                'male',
                'female',
                'other'
            ]
        },
        'date': {
            'type': 'string',
            'format': 'date',
            'options': {
                'flatpickr': {}
            }
        },
        tags: {
            type: "array",
            format: "select2",
            uniqueItems: true,
            items: {
                type: "string",
                enum: ["bold", "italic", "smallcaps"]
            }
        },
        'pets': {
            'type': 'array',
            'format': 'table',
            'title': 'Pets',
            'uniqueItems': true,
            'items': {
                'type': 'object',
                'title': 'Pet',
                'properties': {
                    'type': {
                        'type': 'string',
                        'enum': [
                            'cat',
                            'dog',
                            'bird',
                            'reptile',
                            'other'
                        ],
                        'default': 'dog'
                    },
                    'name': {
                        'type': 'string'
                    }
                }
            },
            'default': [
                {
                    'type': 'dog',
                    'name': 'Walter'
                }
            ]
        }
    }
}

var data = {}
var defaultOptions = {
    iconlib: 'fontawesome4',
    object_layout: 'normal',
    schema: defaultSchema,
    show_errors: 'interaction',
    theme: 'bootstrap4'
}

data.options = Object.assign(defaultOptions, data.options);
document.querySelector("#taSchema").value = JSON.stringify(data.options.schema, null, 2);

var jsoneditor = null;

function initJsoneditor() {
    // destroy old JSONEditor instance if exists
    if (jsoneditor) {
        jsoneditor.destroy()
    }

    // Set an option globally
    //JSONEditor.defaults.options.theme = 'bootstrap4';
    const element = document.getElementById('editor_holder');
    // Set an option during instantiation
    jsoneditor = new window.JSONEditor(element, data.options)

    // listen for changes
    jsoneditor.on('change', function () {
        // output
        //var json = jsoneditor.getValue()
        //outputTextarea.value = JSON.stringify(json, null, 2)

        // validate
        var validationErrors = jsoneditor.validate()
        if (validationErrors.length) {
            validateTextarea.value = JSON.stringify(validationErrors, null, 2)
        } else {
            validateTextarea.value = 'valid'
        }
    })
}