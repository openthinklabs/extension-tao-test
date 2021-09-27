export default {
    addTest: '[data-context="resource"][data-action="instanciate"]',
    addSubClassUrl: 'taoTests/Tests/addSubClass',

    deleteTest: '[data-context="resource"][data-action="removeNode"]',
    deleteClass: '[data-context="resource"][data-action="removeNode"]',
    deleteTestUrl: 'taoTests/Tests/delete',
    deleteConfirm: '[data-control="ok"]',

    editClassLabelUrl: 'taoTests/Tests/editClassLabel',
    editItemUrl: 'taoTests/Tests/editTest',
    editTestUrl: 'taoTests/Tests/editTest',

    moveClass: '[id="class-move-to"][data-context="class"][data-action="moveTo"]',
    moveConfirmSelector: 'button[data-control="ok"]',

    restResourceGetAll: 'tao/RestResource/getAll',
    root: '[data-uri="http://www.tao.lu/Ontologies/TAOTest.rdf#Test"]',

    testForm: 'form[action="/taoTests/Tests/editTest"]',
    testClassForm: 'form[action="/taoTests/Tests/editClassLabel"]',
    treeRenderUrl: 'taoTests/Tests',
};
