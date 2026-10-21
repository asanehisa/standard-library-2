import React from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { executeSearch, FilterSearch } from "@yext/search-ui-react";
import { useTranslation } from "react-i18next";
import { type FieldProps } from "@puckeditor/core";
import {
  YextAutoField,
  type YextArrayField,
  useTemplateMetadata,
  type TranslatableString,
  msg,
  type LocatorEntityType,
  resolveComponentData,
} from "@yext/visual-editor/section-library-support";

export type LocatorStaticFilter = {
  fieldId: string;
  label: TranslatableString;
};

/** The label is saved with the field so published pages do not need editor metadata. */
export const StaticFilterFields = ({
  value = [],
  onChange,
  id,
  readOnly,
}: FieldProps<{}, LocatorStaticFilter[]>) => {
  const metadata = useTemplateMetadata();
  const availableFields = metadata?.locatorStaticFilterFields ?? {};
  const options = Object.entries(availableFields)
    .map(([fieldId, field]) => ({
      label: field.field_name || fieldId,
      value: fieldId,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
  // Keep saved selections editable if a field is removed from Search or metadata is unavailable.
  for (const { fieldId } of value) {
    if (fieldId && !options.some((option) => option.value === fieldId)) {
      options.push({ label: fieldId, value: fieldId });
    }
  }
  const field: YextArrayField<LocatorStaticFilter[]> = {
    type: "array",
    label: msg("fields.staticFilters", "Static Filters"),
    arrayFields: {
      fieldId: {
        type: "basicSelector",
        label: msg("fields.field", "Field"),
        options: [
          {
            label: msg("fields.options.selectAField", "Select a field"),
            value: "",
          },
          ...options,
        ],
      },
      label: {
        type: "translatableString",
        label: msg("fields.displayName", "Display Name"),
        showFieldSelector: false,
      },
    },
    defaultItemProps: { fieldId: "", label: { defaultValue: "" } },
    getItemSummary: (item) =>
      availableFields[item.fieldId]?.field_name || item.fieldId,
  };
  return (
    <YextAutoField
      id={id}
      field={field}
      value={value}
      readOnly={readOnly}
      onChange={(items: LocatorStaticFilter[], uiState) =>
        onChange(
          items.map((item, index) =>
            item.fieldId &&
            item.fieldId !== value[index]?.fieldId &&
            (!item.label ||
              (typeof item.label !== "string" && !item.label.defaultValue))
              ? {
                  ...item,
                  label: {
                    ...(typeof item.label === "object" ? item.label : {}),
                    defaultValue:
                      availableFields[item.fieldId]?.field_name || item.fieldId,
                  },
                }
              : item
          ),
          uiState
        )
      }
    />
  );
};

export const LocatorStaticFilters = ({
  fields,
  entityTypes,
}: {
  fields: LocatorStaticFilter[];
  entityTypes: LocatorEntityType[];
}) => {
  const { t, i18n } = useTranslation();
  const searchActions = useSearchActions();
  const seenFields = new Set<string>();
  return fields.map(({ fieldId, label }) => {
    if (!fieldId || seenFields.has(fieldId)) {
      return null;
    }
    seenFields.add(fieldId);
    const displayName = resolveComponentData(label, i18n.language) || fieldId;
    return (
      <FilterSearch
        key={fieldId}
        label={displayName}
        ariaLabel={displayName}
        placeholder={t("searchHere", "Search here...")}
        searchFields={entityTypes.map((entityType) => ({
          entityType,
          fieldApiName: fieldId,
        }))}
        onSelect={({
          currentFilter,
          newFilter,
          newDisplayName,
          setCurrentFilter,
          executeFilterSearch,
        }) => {
          if (currentFilter) {
            searchActions.setFilterOption({
              filter: currentFilter,
              selected: false,
            });
          }
          searchActions.setFilterOption({
            filter: newFilter,
            displayName: newDisplayName,
            selected: true,
          });
          setCurrentFilter(newFilter);
          executeFilterSearch(newDisplayName);
          searchActions.setOffset(0);
          executeSearch(searchActions);
        }}
        customCssClasses={{
          filterSearchContainer: "font-body-fontFamily",
          label: "font-bold text-md font-body-fontFamily",
          inputElement:
            "rounded-md p-3 font-body-fontFamily text-body-fontSize",
          focusedOption: "bg-gray-200 hover:bg-gray-200 block",
          option: "hover:bg-gray-100 px-4 py-3",
        }}
      />
    );
  });
};
