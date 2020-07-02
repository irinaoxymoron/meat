function Calculator() {

    var moneyTable = {
        "30": {
            "плохо": {
                "0 мес.": 28436,
                "1 мес.": 45845,
                "6 мес.": 67897
            },
            "уверенно": {
                "0 мес.": 35545,
                "1 мес.": 57307,
                "6 мес.": 84872
            },
            "свободно": {
                "0 мес.": 42654,
                "1 мес.": 68768,
                "6 мес.": 101846
            }
        }, 
        "40": {
            "плохо": {
                "0 мес.": 37914,
                "1 мес.": 61127,
                "6 мес.": 90530
            },
            "уверенно": {
                "0 мес.": 47393,
                "1 мес.": 76409,
                "6 мес.": 113162
            },
            "свободно": {
                "0 мес.": 56871,
                "1 мес.": 91691,
                "6 мес.": 135795
            }
        },
        "50": {
            "плохо": {
                "0 мес.": 47393,
                "1 мес.": 79409,
                "6 мес.": 113162
            },
            "уверенно": {
                "0 мес.": 59241,
                "1 мес.": 95511,
                "6 мес.": 141453
            },
            "свободно": {
                "0 мес.": 71089,
                "1 мес.": 114613,
                "6 мес.": 169744
            }
        }
    }

    var currencySymbol = null;

    this.changePrice = function(e) {
        
        var data = {};
        
        $(".calculator-gadget input[type = radio]:checked").each(function() {
            if ($(this).attr("name")) data[$(this).attr("name")] = $(this).val();
        });

        var price = moneyTable[data["hours"]][data["speak"]][data["skill"]];
        price = parseInt(price);
        if (isNaN(price) || price < 0) price = 0;

        if (price > 0) {
            
            formattedPrice = price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1' + ' ');
            
            currencySymbol = $(".calculator-gadget .price-place").html().split('<span');
            currencySymbol[0] = "";
            currencySymbol = currencySymbol.join("<span");
            
            $(".calculator-gadget .price-place").html(formattedPrice + " " + currencySymbol + " &#8381;");
            
        } else {
            $(".calculator-gadget .price-place").html("");
        }
    }


    this.selectVariant = function(e) {

        var tag = e.target.tagName;
        if ($(tag).is("span")) {
            var checkbox = e.target.querySelector('input[type=radio]');
        } else {
            var checkbox = e.target.parentNode.querySelector('input[type=radio]');
        }

        checkbox.setAttribute("checked", "checked");
        checkbox.parentNode.classList.add("checked");
        var allVariants = checkbox.parentNode.parentNode.querySelectorAll('input[type=radio]');
        
        $(allVariants).each(function(){
            if (this!=checkbox) {
                checkbox.setAttribute("checked", "");
                $(this).parent().removeClass("checked");
            }
        });
        
        self.changePrice();
    }

    $(".calculator-gadget").on("click", ".calculator-radio-block-label", function(e) {
      self.selectVariant(e);
    });
}

$(document).ready(function() {
    Calculator();
});

