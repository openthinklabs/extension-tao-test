/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA ;
 *
 */
/**
 * @author Sam <sam@taotesting.com>
 */
define([
    'jquery',
    'lodash',
    'core/promise',
    'tpl!taoTests/test/runner/sample/layout',
    'taoTests/runner/areaBroker'
], function($, _, Promise, layoutTpl, areaBroker){
    'use strict';

    //Test template
    var $container = $(layoutTpl());

    //set up the areaBroker on a detached node
    var broker = areaBroker($container);
    broker.defineAreas({
        'content' : $('.content', $container),
        'toolbox' : $('.toolbox', $container),
        'navigation' : $('.navigation', $container),
        'control' : $('.control', $container),
        'panel' : $('.panel', $container)
    });

    return {
        name : 'minimalistic',
        init : function init(){
            var self = this;
            var config = this.getConfig();

            //install event based behavior
            this.on('ready', function(){
                this.loadItem(0);
            })
            .on('move', function(type){

                var test = this.getTestContext();


                if(type === 'next'){
                   if(test.items[test.current + 1]){
                        self.unloadItem(test.current);
                        self.loadItem(test.current + 1);
                   } else {
                        self.finish();
                   }
                }
                else if(type === 'previous'){

                   if(test.items[test.current - 1]){
                        self.unloadItem(test.current);
                        self.loadItem(test.current - 1);
                   } else {
                        self.loadItem(0);
                   }
                }
            });


            //load test data
            return new Promise(function(resolve, reject){

                $.getJSON(config.url).success(function(test){
                    self.setTestContext(_.defaults(test || {}, {
                        items : {},
                        current: 0
                    }));

                    resolve();
                });
            });
        },

        render : function(){

            var config = this.getConfig();
            var context = this.getTestContext();


            broker.getContainer().find('.title').html('Running Test ' + context.id);

            var $renderTo = config.$renderTo || $('body');



            $renderTo.append(broker.getContainer());
        },

        loadItem : function loadItem(itemIndex){
            var self = this;

            var test = this.getTestContext();
            var $content = broker.getContentArea();

            $content.html('loading');

            return new Promise(function(resolve, reject){

                setTimeout(function(){
                    test.current = itemIndex;
                    self.setTestContext(test);

                    resolve(test.items[itemIndex]);
                }, 500);
            });

        },

        renderItem : function renderItem(item){

            var $content = broker.getContentArea();
            $content.html(
                '<h1>' + item.id + '</h1>' +
                '<div>' + item.content + '</div>'
            );
        },

        getAreaBroker : function getAreaBroker(){
            return broker;
        }
    };
});
