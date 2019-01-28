#!/bin/bash

JS_DIR="${0%/*}/js"
MAIN_JS="${JS_DIR}/main.js"
INDEX_JS="${JS_DIR}/../../index.js"

# TODO: Automatically generate constants
CONSTANTS=(
  "kCAFillModeRemoved"
  "kCAFillModeForwards"
  "kCAFillModeBackwards"
  "kCAFillModeBoth"
  "kCAMediaTimingFunctionLinear"
  "kCAMediaTimingFunctionEaseIn"
  "kCAMediaTimingFunctionEaseOut"
  "kCAMediaTimingFunctionEaseInEaseOut"
  "kCAMediaTimingFunctionDefault"
  "kCAAnimationLinear"
  "kCAAnimationDiscrete"
  "kCAAnimationPaced"
  "kCAAnimationCubic"
  "kCAAnimationCubicPaced"
  "kCAAnimationRotateAuto"
  "kCAAnimationRotateAutoReverse"
)

FILES=`find ${JS_DIR} -name \*.js`

# import files
print_import() {
  for FILE in ${FILES}; do
    FILE_PATH=${FILE#${JS_DIR}}
    FILE_PATH=${FILE_PATH%.js}
    CLASS=${FILE_PATH##*/}
    CATEGORY=${FILE%/*}
    CATEGORY=${CATEGORY##*/}
  
    if [ "${CLASS}" != "main" \
        -a "${CLASS}" != "constants" \
        -a "${CLASS##*.}" != "web" \
        -a "${CATEGORY}" != "third_party" ]; then
      echo "import ${CLASS} from '.${FILE_PATH}'" >> $1
    fi
  done
  echo "import * as constants from './constants'" >> $1
}

print_import_es6() {
  for FILE in ${FILES}; do
    FILE_PATH=${FILE#${JS_DIR}}
    FILE_PATH=${FILE_PATH%.js}
    CLASS=${FILE_PATH##*/}
    CATEGORY=${FILE%/*}
    CATEGORY=${CATEGORY##*/}
  
    if [ "${CLASS}" != "main" \
        -a "${CLASS}" != "constants" \
        -a "${CLASS##*.}" != "web" \
        -a "${CATEGORY}" != "third_party" ]; then
      echo "import ${CLASS} from '${JS_DIR}${FILE_PATH}'" >> $1
    fi
  done

  echo "import * as constants from '${JS_DIR}/constants'" >> $1
  echo "" >> $1
  for CONSTANT in "${CONSTANTS[@]}"; do
    echo "const ${CONSTANT} = constants.${CONSTANT}" >> $1
  done
}


# register classes to ClassList
print_register() {
  echo "" >> $1
  for FILE in ${FILES}; do
    CLASS=${FILE##*/}
    CLASS=${CLASS%.js}
    CATEGORY=${FILE%/*}
    CATEGORY=${CATEGORY##*/}
  
    if [ "${CLASS}" != "main" \
        -a "${CLASS}" != "constants" \
        -a "${CLASS##*.}" != "web" \
        -a "${CATEGORY}" != "third_party" \
        -a "${CATEGORY}" != "util" ]; then
      echo "_ClassList.registerClass(${CLASS}, '${CLASS}')" >> $1
    fi
  done
}
  
# export classes
print_export() {
  echo "" >> $1
  echo "/*global exports*/" >> $1
  
  for FILE in ${FILES}; do
    CLASS=${FILE##*/}
    CLASS=${CLASS%.js}
    CATEGORY=${FILE%/*}
    CATEGORY=${CATEGORY##*/}
  
    if [ "${CLASS}" != "main" \
      -a "${CLASS}" != "constants" \
      -a "${CLASS##*.}" != "web" \
      -a "${CATEGORY}" != "third_party" ]; then
      echo "exports.${CLASS} = ${CLASS}" >> $1
    fi
  done

  echo "" >> $1
  for CONSTANT in "${CONSTANTS[@]}"; do
    echo "exports.${CONSTANT} = constants.${CONSTANT}" >> $1
  done
}

# export classes for ES6
print_export_es6() {
  echo "" >> $1
  echo "export {" >> $1
  
  for FILE in ${FILES}; do
    CLASS=${FILE##*/}
    CLASS=${CLASS%.js}
    CATEGORY=${FILE%/*}
    CATEGORY=${CATEGORY##*/}
  
    if [ "${CLASS}" != "main" \
      -a "${CLASS}" != "constants" \
      -a "${CLASS##*.}" != "web" \
      -a "${CATEGORY}" != "third_party" ]; then
      echo "  ${CLASS}," >> $1
    fi
  done

  echo "" >> $1
  for CONSTANT in "${CONSTANTS[@]}"; do
    echo "  ${CONSTANT}," >> $1
  done
  echo "}" >> $1
}

# main.js
cat /dev/null > ${MAIN_JS}
print_import ${MAIN_JS}
print_register ${MAIN_JS}
print_export ${MAIN_JS}

# index.js
cat /dev/null > ${INDEX_JS}
print_import_es6 ${INDEX_JS}
print_register ${INDEX_JS}
print_export_es6 ${INDEX_JS}

