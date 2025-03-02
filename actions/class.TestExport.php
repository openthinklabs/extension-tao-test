<?php

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
 * Copyright (c) 2002-2008 (original work) Public Research Centre Henri Tudor & University of Luxembourg
 *                         (under the project TAO & TAO2);
 *               2008-2010 (update and modification) Deutsche Institut für Internationale Pädagogische Forschung
 *                         (under the project TAO-TRANSFER);
 *               2009-2012 (update and modification) Public Research Centre Henri Tudor
 *                         (under the project TAO-SUSTAIN & TAO-DEV);
 *               2012-2025 (update and modification) Open Assessment Technologies SA;
 */

use oat\tao\model\featureFlag\FeatureFlagChecker;
use oat\taoTests\models\MissingTestmodelException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use tao_models_classes_export_ExportHandler as ExportHandlerInterface;

/**
 * This controller provide the actions to export tests
 *
 * @author  CRP Henri Tudor - TAO Team - {@link http://www.tao.lu}
 * @license GPLv2  http://www.opensource.org/licenses/gpl-2.0.php
 * @package taoTests
 *
 */
class taoTests_actions_TestExport extends tao_actions_Export
{
    private const FEATURE_FLAG_QTI3_EXPORT = 'FEATURE_FLAG_QTI3_EXPORT';

    /**
     * overwrite the parent index to add the requiresRight for Tests
     *
     * @requiresRight id READ
     * @see           tao_actions_Export::index()
     */
    public function index()
    {
        parent::index();
    }

    protected function getAvailableExportHandlers()
    {
        $returnValue = parent::getAvailableExportHandlers();

        $resources = $this->getResourcesToExport();
        $testModels = [];
        foreach ($resources as $resource) {
            try {
                $model = taoTests_models_classes_TestsService::singleton()->getTestModel($resource);
                $testModels[$model->getUri()] = $model;
            } catch (MissingTestmodelException $e) {
                // no model found, skip exporter retrieval
            }
        }
        foreach ($testModels as $model) {
            $impl = taoTests_models_classes_TestsService::singleton()->getTestModelImplementation($model);
            if (in_array('tao_models_classes_export_ExportProvider', class_implements($impl))) {
                foreach ($impl->getExportHandlers() as $handler) {
                    if ($this->isHandlerEnabled($handler)) {
                        array_unshift($returnValue, $handler);
                    }
                }
            }
        }

        return $returnValue;
    }

    /**
     * TODO: This was created only to temporary handle QTI3 Export feature. Will be removed.
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    private function isHandlerEnabled(ExportHandlerInterface $handler): bool
    {
        if (
            !$this->getPsrContainer()->get(FeatureFlagChecker::class)->isEnabled(self::FEATURE_FLAG_QTI3_EXPORT)
            && $handler instanceof oat\taoQtiTest\models\export\Formats\Package3p0\TestPackageExport
        ) {
            return false;
        }

        return true;
    }
}
