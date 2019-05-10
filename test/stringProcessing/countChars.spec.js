import charCountFunction from "../../src/stringProcessing/countChars.js";

describe( "counts chars in a string", function() {
  it( "returns the number of words", function() {
    expect( charCountFunction( "this is a string" ) ).toBe( 13 );
    expect( charCountFunction( "this is a string, a very nice string." ) ).toBe( 30 );
    expect( charCountFunction( " انتشار کتابی درباره خفن‌ترین آزمایش های تاریخ علم، توجه رسانه‌ها را به خود جلب کردیل‌ها در اسید و دیگر آزمایش‌های خفن عل این عنوان کتابی است که چند" ) ).toBe( 120 );
    //expect( charCountFunction( "<p class='class'>word</p>" ) ).toBe( 4 );
  } );
} );